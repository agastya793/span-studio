import os
import sys
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

# Source Master Renders (High-Resolution 3D CAD Simulation Stills)
BRAIN_DIR = r"C:\Users\acer\.gemini\antigravity-ide\brain\6c69a630-2bd8-43ad-9b71-4231b0f4e165"
IMG_MILLING = os.path.join(BRAIN_DIR, "cnc_active_milling_1791143338215.jpg")
IMG_CONTOUR = os.path.join(BRAIN_DIR, "cnc_surface_contour_1791143372267.jpg")
IMG_SHEAR = os.path.join(BRAIN_DIR, "cnc_shear_macro_1791143409032.jpg")

OUT_DIR = r"public\videos"
os.makedirs(OUT_DIR, exist_ok=True)
OUT_MP4_1 = os.path.join(OUT_DIR, "precision-tooling-3d.mp4")
OUT_MP4_2 = os.path.join(OUT_DIR, "3d-animation.mp4")
OUT_POSTER1 = os.path.join(OUT_DIR, "precision-tooling-3d.jpg")
OUT_POSTER2 = os.path.join(OUT_DIR, "3d-animation.jpg")
OUT_SHOWCASE_IMG = r"public\images\showcase\cnc-exploded.jpg"

WIDTH = 1280
HEIGHT = 720
FPS = 30
TOTAL_FRAMES = 270  # 9.0 seconds of silky smooth loop

print("Loading 3D CAD working tool master source renders...")
im_milling = Image.open(IMG_MILLING).convert("RGB")
im_contour = Image.open(IMG_CONTOUR).convert("RGB")
im_shear = Image.open(IMG_SHEAR).convert("RGB")

# Save high-res poster from the active milling shot
im_milling.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS).save(OUT_POSTER1, quality=94)
im_milling.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS).save(OUT_POSTER2, quality=94)
im_milling.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS).save(OUT_SHOWCASE_IMG, quality=94)

# Load fonts
try:
    font_mono_lg = ImageFont.truetype("consola.ttf", 22)
    font_mono_md = ImageFont.truetype("consola.ttf", 15)
    font_mono_sm = ImageFont.truetype("consola.ttf", 13)
    font_mono_xs = ImageFont.truetype("consola.ttf", 11)
except Exception:
    font_mono_lg = ImageFont.load_default()
    font_mono_md = ImageFont.load_default()
    font_mono_sm = ImageFont.load_default()
    font_mono_xs = ImageFont.load_default()

def ease_in_out(t):
    return 0.5 * (1.0 - math.cos(math.pi * t))

def transform_camera(img, zoom, pan_x, pan_y, rot_deg=0.0):
    """Simulates 3D camera dolly, pan, and subtle lens tilt"""
    w, h = img.size
    crop_w = int(w / zoom)
    crop_h = int(h / zoom)
    
    cx = int(w * (0.5 + pan_x))
    cy = int(h * (0.5 + pan_y))
    
    left = max(0, min(w - crop_w, cx - crop_w // 2))
    top = max(0, min(h - crop_h, cy - crop_h // 2))
    right = left + crop_w
    bottom = top + crop_h
    
    cropped = img.crop((left, top, right, bottom))
    if abs(rot_deg) > 0.01:
        cropped = cropped.rotate(rot_deg, resample=Image.Resampling.BICUBIC)
    return cropped.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)

def draw_hud_overlay(canvas, frame_idx, scene_title, scene_spec, gcode_line, laser_pos=None):
    draw = ImageDraw.Draw(canvas)
    t = frame_idx / FPS
    
    pad = 28
    arm = 18
    color_dim = (140, 150, 165, 180)
    color_bright = (255, 255, 255, 240)
    color_accent = (212, 0, 42, 255)
    color_cyan = (0, 220, 255, 230)
    color_green = (40, 240, 140, 240)
    
    # 1. Technical Corner Brackets
    draw.line([(pad, pad), (pad + arm, pad)], fill=color_dim, width=1)
    draw.line([(pad, pad), (pad, pad + arm)], fill=color_dim, width=1)
    draw.line([(WIDTH - pad, pad), (WIDTH - pad - arm, pad)], fill=color_dim, width=1)
    draw.line([(WIDTH - pad, pad), (WIDTH - pad, pad + arm)], fill=color_dim, width=1)
    draw.line([(pad, HEIGHT - pad), (pad + arm, HEIGHT - pad)], fill=color_dim, width=1)
    draw.line([(pad, HEIGHT - pad), (pad, HEIGHT - pad - arm)], fill=color_dim, width=1)
    draw.line([(WIDTH - pad, HEIGHT - pad), (WIDTH - pad - arm, HEIGHT - pad)], fill=color_dim, width=1)
    draw.line([(WIDTH - pad, HEIGHT - pad), (WIDTH - pad, HEIGHT - pad - arm)], fill=color_dim, width=1)
    
    # 2. Top Header Bar
    draw.text((pad + 12, pad - 8), "SPAN STUDIO // 3D PRECISION TOOLING LAB", font=font_mono_md, fill=color_bright)
    
    # Pulsing Live CAD Execution Indicator
    pulse = 0.5 + 0.5 * math.sin(t * 5.0)
    dot_color = (int(40 * pulse + 10), int(240 * pulse + 30), int(140 * pulse + 20))
    draw.ellipse([(pad + 440, pad - 3), (pad + 450, pad + 7)], fill=dot_color)
    draw.text((pad + 458, pad - 6), "TOOL IN OPERATION // REAL-TIME PHYSICS", font=font_mono_sm, fill=(200, 220, 235))
    
    timecode_str = f"TC 00:0{int(t // 60):01d}:{int(t % 60):02d}:{int((t * 30) % 30):02d}"
    draw.text((WIDTH - pad - 165, pad - 8), timecode_str, font=font_mono_md, fill=color_accent)
    
    # 3. Dynamic Laser Tracking / Tolerance Measurement Beam (if specified)
    if laser_pos:
        lx, ly = laser_pos
        # Pulsing target reticle
        r = 18 + int(3 * math.sin(t * 6.0))
        draw.ellipse([(lx - r, ly - r), (lx + r, ly + r)], outline=color_green, width=1)
        draw.line([(lx - r - 6, ly), (lx + r + 6, ly)], fill=color_green, width=1)
        draw.line([(lx, ly - r - 6), (lx, ly + r + 6)], fill=color_green, width=1)
        
        # Callout line and HUD box
        call_x = lx + 50
        call_y = ly - 35
        draw.line([(lx + r, ly), (call_x, call_y)], fill=color_green, width=1)
        draw.line([(call_x, call_y), (call_x + 180, call_y)], fill=color_green, width=1)
        draw.text((call_x + 6, call_y - 18), scene_title, font=font_mono_sm, fill=color_bright)
        draw.text((call_x + 6, call_y + 4), scene_spec, font=font_mono_xs, fill=color_cyan)
    
    # 4. G-Code Live Streaming Display (floating upper-right)
    draw.rectangle([(WIDTH - pad - 340, pad + 24), (WIDTH - pad, pad + 68)], fill=(12, 16, 20, 200), outline=(50, 60, 75))
    draw.text((WIDTH - pad - 330, pad + 30), "CNC G-CODE CONTROLLER:", font=font_mono_xs, fill=(160, 180, 200))
    draw.text((WIDTH - pad - 330, pad + 46), gcode_line, font=font_mono_sm, fill=color_green)
    
    # 5. Bottom Telemetry Bar
    draw.line([(pad, HEIGHT - pad - 24), (WIDTH - pad, HEIGHT - pad - 24)], fill=(45, 52, 60), width=1)
    
    # Live machining coordinates & RPM
    coord_x = 248.50 + 15.0 * math.sin(t * 1.5)
    coord_y = 112.20 + 8.0 * math.cos(t * 1.8)
    coord_z = -14.000 + 0.5 * math.sin(t * 0.8)
    feed_rate = int(2400 + 350 * math.sin(t * 3.0))
    rpm_val = int(18000 + 200 * math.cos(t * 2.5))
    
    telemetry_left = f"X: {coord_x:+07.3f} mm | Y: {coord_y:+07.3f} mm | Z: {coord_z:+07.3f} mm | FEED: {feed_rate} mm/min | {rpm_val:,} RPM"
    draw.text((pad + 12, HEIGHT - pad - 16), telemetry_left, font=font_mono_sm, fill=(170, 185, 200))
    
    telemetry_right = f"TOLERANCE: +/-0.001 mm // RENISHAW ACTIVE"
    draw.text((WIDTH - pad - 320, HEIGHT - pad - 16), telemetry_right, font=font_mono_sm, fill=color_cyan)

frames = []
print(f"Synthesizing {TOTAL_FRAMES} high-definition 3D active tool simulation frames...")

# Scene 1: High-Speed Pocket Milling (Frames 0 - 90)
# Scene 2: 5-Axis Curved Aerofoil Contouring (Frames 91 - 180)
# Scene 3: Thermal Chip Shear Physics Macro (Frames 181 - 245)
# Scene 4: Return Loop to High-Speed Pocket Milling (Frames 246 - 269)

for f in range(TOTAL_FRAMES):
    t = f / FPS
    
    if f < 90:
        # Scene 1: High-Speed Pocket Milling
        p = f / 90.0
        zoom = 1.02 + 0.16 * ease_in_out(p)
        pan_x = -0.04 + 0.08 * ease_in_out(p)
        pan_y = 0.02 * math.sin(p * math.pi)
        rot = 0.3 * math.sin(p * math.pi * 2.0)
        
        img = transform_camera(im_milling, zoom, pan_x, pan_y, rot)
        
        # Vibration jitter on swarf interface
        jitter_x = int(1.5 * math.sin(f * 1.8))
        jitter_y = int(1.5 * math.cos(f * 2.2))
        laser_pt = (int(WIDTH * 0.52) + jitter_x, int(HEIGHT * 0.52) + jitter_y)
        
        gcode = f"G01 X{248.5+p*12:.3f} Y{88.2+p*6:.3f} Z-14.000 F2400"
        draw_hud_overlay(img, f, "CAT40 SOLID CARBIDE 4-FLUTE", "COOLANT: 70 BAR DUAL JETS ACTIVE", gcode, laser_pt)
        
    elif f < 180:
        # Scene 2: 5-Axis Curved Aerofoil Contouring
        local_f = f - 90
        p = local_f / 90.0
        
        zoom = 1.05 + 0.18 * ease_in_out(p)
        pan_x = 0.06 - 0.12 * ease_in_out(p)
        pan_y = -0.03 + 0.05 * ease_in_out(p)
        rot = -0.5 * math.sin(p * math.pi)
        
        shot2_img = transform_camera(im_contour, zoom, pan_x, pan_y, rot)
        
        if local_f < 12:
            blend_alpha = local_f / 12.0
            prev_img = transform_camera(im_milling, 1.18, 0.04, 0.0, 0.0)
            img = Image.blend(prev_img, shot2_img, blend_alpha)
        else:
            img = shot2_img
            
        laser_pt = (int(WIDTH * (0.68 - 0.06 * p)), int(HEIGHT * (0.50 + 0.04 * math.sin(p * math.pi))))
        gcode = f"G05.1 Q1 X{192.4+p*18:.3f} A{p*8.2:.2f} B{-p*4.1:.2f} F3900"
        draw_hud_overlay(img, f, "RENISHAW OMP60 OPTICAL PROBE", "SURFACE DEVIATION: +0.0012 mm [PASS]", gcode, laser_pt)
        
    elif f < 245:
        # Scene 3: Thermal Chip Shear Physics Macro
        local_f = f - 180
        p = local_f / 65.0
        
        zoom = 1.10 + 0.22 * ease_in_out(p)
        pan_x = -0.05 + 0.09 * ease_in_out(p)
        pan_y = 0.03 * math.sin(p * math.pi)
        rot = 0.6 * math.sin(p * math.pi)
        
        shot3_img = transform_camera(im_shear, zoom, pan_x, pan_y, rot)
        
        if local_f < 12:
            blend_alpha = local_f / 12.0
            prev_img = transform_camera(im_contour, 1.23, -0.06, 0.02, 0.0)
            img = Image.blend(prev_img, shot3_img, blend_alpha)
        else:
            img = shot3_img
            
        # Thermal pulse coordinate
        thermal_pt = (int(WIDTH * 0.46), int(HEIGHT * 0.58))
        gcode = f"G96 S320 M03 // CHIP TEMP: {620+int(40*math.sin(t*8)):d} C"
        draw_hud_overlay(img, f, "MICRO-SHEAR BOUNDARY LAYER", "SHEAR STRESS: 850 MPa // Ra 0.2 um", gcode, thermal_pt)
        
    else:
        # Scene 4: Return Loop to High-Speed Pocket Milling
        local_f = f - 245
        p = local_f / 25.0
        
        zoom = 1.16 - 0.14 * ease_in_out(p)
        pan_x = 0.04 - 0.08 * ease_in_out(p)
        pan_y = 0.01 * math.cos(p * math.pi)
        rot = 0.2 * (1.0 - p)
        
        shot4_img = transform_camera(im_milling, zoom, pan_x, pan_y, rot)
        
        if local_f < 10:
            blend_alpha = local_f / 10.0
            prev_img = transform_camera(im_shear, 1.32, 0.04, 0.0, 0.0)
            img = Image.blend(prev_img, shot4_img, blend_alpha)
        elif local_f >= 17:
            # Seamless loop crossfade back into frame 0
            blend_to_start = (local_f - 17) / 8.0
            start_img = transform_camera(im_milling, 1.02, -0.04, 0.0, 0.0)
            img = Image.blend(shot4_img, start_img, blend_to_start)
        else:
            img = shot4_img
            
        laser_pt = (int(WIDTH * 0.52), int(HEIGHT * 0.52))
        gcode = "M09 // TOLERANCE VERIFIED ISO 2768-mK"
        draw_hud_overlay(img, f, "HIGH-SPEED POCKET FINISH", "CYCLE TIME: 00:09.00 // VERIFIED", gcode, laser_pt)
        
    frames.append(np.array(img))
    if f % 30 == 0:
        print(f"Rendered frame {f}/{TOTAL_FRAMES} ({int(f/TOTAL_FRAMES*100)}%)")

print("Encoding master MP4 with H.264 high-profile faststart...")

def encode_video(output_path):
    writer = imageio_ffmpeg.write_frames(
        output_path,
        (WIDTH, HEIGHT),
        fps=FPS,
        codec='libx264',
        pix_fmt_in='rgb24',
        output_params=[
            '-pix_fmt', 'yuv420p',
            '-preset', 'slow',
            '-crf', '17',
            '-movflags', '+faststart',
            '-tune', 'film'
        ]
    )
    writer.send(None)
    for frame in frames:
        writer.send(frame)
    writer.close()
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Successfully generated {output_path} ({size_mb:.2f} MB)")

encode_video(OUT_MP4_1)
encode_video(OUT_MP4_2)
print("Active 3D Precision Tooling Video generation complete!")
