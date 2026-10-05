import os
import sys
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

# Paths
BRAIN_DIR = r"C:\Users\acer\.gemini\antigravity-ide\brain\6c69a630-2bd8-43ad-9b71-4231b0f4e165"
IMG_EXPLODED = os.path.join(BRAIN_DIR, "cnc_exploded_1791139955006.jpg")
IMG_GEAR = os.path.join(BRAIN_DIR, "cnc_gear_macro_1791142628706.jpg")
IMG_COLLET = os.path.join(BRAIN_DIR, "cnc_collet_macro_1791142654352.jpg")

OUT_DIR = r"public\videos"
os.makedirs(OUT_DIR, exist_ok=True)
OUT_MP4_1 = os.path.join(OUT_DIR, "precision-tooling-3d.mp4")
OUT_MP4_2 = os.path.join(OUT_DIR, "3d-animation.mp4")
OUT_POSTER = os.path.join(OUT_DIR, "3d-animation.jpg")
OUT_POSTER2 = os.path.join(OUT_DIR, "precision-tooling-3d.jpg")

WIDTH = 1280
HEIGHT = 720
FPS = 30
TOTAL_FRAMES = 240  # 8.0 seconds of silky smooth loop

print("Loading 3D CAD master source renders...")
im_exploded = Image.open(IMG_EXPLODED).convert("RGB")
im_gear = Image.open(IMG_GEAR).convert("RGB")
im_collet = Image.open(IMG_COLLET).convert("RGB")

# Save high-res poster
im_exploded.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS).save(OUT_POSTER, quality=92)
im_exploded.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS).save(OUT_POSTER2, quality=92)

# Load font
try:
    font_mono_lg = ImageFont.truetype("consola.ttf", 22)
    font_mono_md = ImageFont.truetype("consola.ttf", 16)
    font_mono_sm = ImageFont.truetype("consola.ttf", 13)
    font_mono_xs = ImageFont.truetype("consola.ttf", 11)
except Exception:
    font_mono_lg = ImageFont.load_default()
    font_mono_md = ImageFont.load_default()
    font_mono_sm = ImageFont.load_default()
    font_mono_xs = ImageFont.load_default()

def ease_in_out(t):
    return 0.5 * (1.0 - math.cos(math.pi * t))

def transform_shot(img, zoom, pan_x, pan_y, rot_deg=0.0):
    """Smooth camera dolly/pan/rotation with high quality interpolation"""
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

def draw_cad_hud(canvas, frame_idx, shot_name, shot_desc, progress_val, tracking_pos=None):
    draw = ImageDraw.Draw(canvas)
    t = frame_idx / FPS
    
    # 1. Outer Technical Corner Brackets
    pad = 28
    arm = 18
    color_dim = (140, 150, 165, 180)
    color_bright = (255, 255, 255, 240)
    color_accent = (212, 0, 42, 255)
    color_cyan = (0, 220, 255, 230)
    
    # Top-Left
    draw.line([(pad, pad), (pad + arm, pad)], fill=color_dim, width=1)
    draw.line([(pad, pad), (pad, pad + arm)], fill=color_dim, width=1)
    # Top-Right
    draw.line([(WIDTH - pad, pad), (WIDTH - pad - arm, pad)], fill=color_dim, width=1)
    draw.line([(WIDTH - pad, pad), (WIDTH - pad, pad + arm)], fill=color_dim, width=1)
    # Bottom-Left
    draw.line([(pad, HEIGHT - pad), (pad + arm, HEIGHT - pad)], fill=color_dim, width=1)
    draw.line([(pad, HEIGHT - pad), (pad, HEIGHT - pad - arm)], fill=color_dim, width=1)
    # Bottom-Right
    draw.line([(WIDTH - pad, HEIGHT - pad), (WIDTH - pad - arm, HEIGHT - pad)], fill=color_dim, width=1)
    draw.line([(WIDTH - pad, HEIGHT - pad), (WIDTH - pad, HEIGHT - pad - arm)], fill=color_dim, width=1)
    
    # 2. Top Status Bar
    draw.text((pad + 12, pad - 8), "SPAN STUDIO // CAD MOTION LAB", font=font_mono_md, fill=color_bright)
    
    # Pulsing red record / live indicator
    pulse = 0.5 + 0.5 * math.sin(t * 4.0)
    dot_color = (int(212 * pulse + 40), 0, int(42 * pulse + 10))
    draw.ellipse([(pad + 380, pad - 3), (pad + 390, pad + 7)], fill=dot_color)
    draw.text((pad + 398, pad - 6), "60 FPS 10-BIT // REAL-TIME RENDER", font=font_mono_sm, fill=(180, 190, 200))
    
    timecode_str = f"TC 00:0{int(t // 60):01d}:{int(t % 60):02d}:{int((t * 30) % 30):02d}"
    draw.text((WIDTH - pad - 165, pad - 8), timecode_str, font=font_mono_md, fill=color_accent)
    
    # 3. Dynamic Center Datum Line
    center_y = HEIGHT // 2
    dash_len = 16
    gap_len = 12
    for x in range(pad + 40, WIDTH - pad - 40, dash_len + gap_len):
        draw.line([(x, center_y), (x + dash_len, center_y)], fill=(80, 95, 110), width=1)
    
    # 4. Animated Cyan Scan Bar (sweeps smoothly)
    scan_x = int((WIDTH - 2 * pad) * ((math.sin(t * 1.5) + 1.0) / 2.0)) + pad
    for dy in range(-12, 13):
        alpha = int(200 * (1.0 - abs(dy) / 12.0))
        draw.line([(scan_x, center_y + dy), (scan_x, center_y + dy)], fill=(0, 220, 255))
    draw.line([(scan_x, center_y - 24), (scan_x, center_y + 24)], fill=(0, 240, 255), width=2)
    
    # 5. Tracking Reticle (if given)
    if tracking_pos:
        tx, ty = tracking_pos
        r = 24
        draw.ellipse([(tx - r, ty - r), (tx + r, ty + r)], outline=color_cyan, width=1)
        draw.line([(tx - r - 8, ty), (tx + r + 8, ty)], fill=color_cyan, width=1)
        draw.line([(tx, ty - r - 8), (tx, ty + r + 8)], fill=color_cyan, width=1)
        
        # Callout line from target to text box
        lead_x = tx + 45
        lead_y = ty - 45
        draw.line([(tx + r, ty), (lead_x, lead_y)], fill=color_bright, width=1)
        draw.line([(lead_x, lead_y), (lead_x + 160, lead_y)], fill=color_bright, width=1)
        draw.text((lead_x + 6, lead_y - 18), shot_name, font=font_mono_sm, fill=color_bright)
        draw.text((lead_x + 6, lead_y + 4), shot_desc, font=font_mono_xs, fill=color_cyan)
        
    # 6. Bottom Telemetry Bar
    draw.line([(pad, HEIGHT - pad - 24), (WIDTH - pad, HEIGHT - pad - 24)], fill=(45, 52, 60), width=1)
    
    # Live coordinate stream
    coord_x = 120.4 + 40.0 * math.cos(t * 0.8)
    coord_y = 12.0 * math.sin(t * 1.2)
    coord_z = -18.5 + 5.0 * math.sin(t * 0.5)
    rpm_val = int(12000 + 450 * math.sin(t * 2.0))
    
    telemetry_left = f"AXIS_X: {coord_x:+07.2f} mm | AXIS_Y: {coord_y:+06.2f} mm | AXIS_Z: {coord_z:+06.2f} mm | SPINDLE: {rpm_val:,} RPM"
    draw.text((pad + 12, HEIGHT - pad - 16), telemetry_left, font=font_mono_sm, fill=(160, 175, 190))
    
    telemetry_right = f"TOLERANCE: +/-0.002 mm // DIN 6499B"
    draw.text((WIDTH - pad - 280, HEIGHT - pad - 16), telemetry_right, font=font_mono_sm, fill=color_accent)

# Pre-render frames
frames = []
print(f"Synthesizing {TOTAL_FRAMES} high-definition 3D animation frames...")

# Segment 1: Exploded View Camera Tracking (Frames 0 - 80)
# Segment 2: Pinion Gear & High-Precision Angular Contact Bearing (Frames 81 - 150)
# Segment 3: ER-32 Collet Chuck & Toolholder Taper Lock (Frames 151 - 210)
# Segment 4: Return to Full Exploded Assembly Sequence (Frames 211 - 239)

for f in range(TOTAL_FRAMES):
    if f < 80:
        # Shot 1: Wide Exploded Assembly Tracking
        p = f / 80.0
        zoom = 1.0 + 0.18 * ease_in_out(p)
        pan_x = -0.08 + 0.16 * ease_in_out(p)
        pan_y = 0.02 * math.sin(p * math.pi)
        rot = 0.4 * math.sin(p * math.pi * 2.0)
        
        img = transform_shot(im_exploded, zoom, pan_x, pan_y, rot)
        track_x = int(WIDTH * (0.42 + 0.12 * p))
        track_y = int(HEIGHT * 0.48)
        draw_cad_hud(img, f, "EXPLODED SPINDLE", "INTERNAL CLEARANCE: 0.008 MM", p, (track_x, track_y))
        
    elif f < 150:
        # Shot 2: Pinion Gear & Bearing Macro
        local_f = f - 80
        p = local_f / 70.0
        
        # Crossfade from Shot 1 if in transition (first 10 frames)
        zoom = 1.08 + 0.22 * ease_in_out(p)
        pan_x = 0.05 - 0.10 * ease_in_out(p)
        pan_y = -0.04 + 0.06 * ease_in_out(p)
        rot = -0.6 * math.sin(p * math.pi)
        
        shot2_img = transform_shot(im_gear, zoom, pan_x, pan_y, rot)
        
        if local_f < 10:
            # Blend
            blend_alpha = local_f / 10.0
            p_prev = (70 + local_f) / 80.0
            prev_img = transform_shot(im_exploded, 1.18, 0.08, 0.0, 0.0)
            img = Image.blend(prev_img, shot2_img, blend_alpha)
        else:
            img = shot2_img
            
        track_x = int(WIDTH * (0.64 - 0.08 * p))
        track_y = int(HEIGHT * 0.46)
        draw_cad_hud(img, f, "FAG 7008-B-TVP", "ANGULAR CONTACT // PRELOAD: 180 N", p, (track_x, track_y))
        
    elif f < 210:
        # Shot 3: ER-32 Collet Chuck & Toolholder Taper Lock
        local_f = f - 150
        p = local_f / 60.0
        
        zoom = 1.12 + 0.20 * ease_in_out(p)
        pan_x = -0.04 + 0.08 * ease_in_out(p)
        pan_y = 0.03 * math.sin(p * math.pi)
        rot = 0.8 * math.sin(p * math.pi)
        
        shot3_img = transform_shot(im_collet, zoom, pan_x, pan_y, rot)
        
        if local_f < 10:
            blend_alpha = local_f / 10.0
            prev_img = transform_shot(im_gear, 1.30, -0.05, 0.02, 0.0)
            img = Image.blend(prev_img, shot3_img, blend_alpha)
        else:
            img = shot3_img
            
        track_x = int(WIDTH * (0.50 + 0.06 * math.sin(p * math.pi)))
        track_y = int(HEIGHT * 0.50)
        draw_cad_hud(img, f, "ER-32 COLLET ARBOR", "RUNOUT < 0.002 MM // CLAMP 120 NM", p, (track_x, track_y))
        
    else:
        # Shot 4: Return to Full Exploded Assembly Sequence (seamless loop)
        local_f = f - 210
        p = local_f / 30.0
        
        zoom = 1.15 - 0.15 * ease_in_out(p)
        pan_x = 0.06 - 0.14 * ease_in_out(p)
        pan_y = 0.01 * math.cos(p * math.pi)
        rot = 0.3 * (1.0 - p)
        
        shot4_img = transform_shot(im_exploded, zoom, pan_x, pan_y, rot)
        
        if local_f < 10:
            blend_alpha = local_f / 10.0
            prev_img = transform_shot(im_collet, 1.32, 0.04, 0.0, 0.0)
            img = Image.blend(prev_img, shot4_img, blend_alpha)
        elif local_f >= 22:
            # Seamless loop crossfade back into frame 0
            blend_to_start = (local_f - 22) / 8.0
            start_img = transform_shot(im_exploded, 1.0, -0.08, 0.0, 0.0)
            img = Image.blend(shot4_img, start_img, blend_to_start)
        else:
            img = shot4_img
            
        track_x = int(WIDTH * 0.44)
        track_y = int(HEIGHT * 0.48)
        draw_cad_hud(img, f, "AXIAL LOCKING SEQUENCE", "ASSEMBLY TOLERANCE VERIFIED", p, (track_x, track_y))
        
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
            '-crf', '18',
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
print("3D Animation Video generation complete!")
