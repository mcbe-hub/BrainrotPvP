import cv2
import os
import json
import numpy as np

def extract_and_generate_spritesheet(mp4_file_path, output_folder, frame_width=234, frame_height=30, fps=10):
    if not os.path.isfile(mp4_file_path):
        print(f"File not found: {mp4_file_path}")
        return

    os.makedirs(output_folder, exist_ok=True)

    video_capture = cv2.VideoCapture(mp4_file_path)
    if not video_capture.isOpened():
        print(f"Failed to open video file: {mp4_file_path}")
        return

    original_fps = int(video_capture.get(cv2.CAP_PROP_FPS))
    frame_interval = max(1, original_fps // fps)

    frames = []
    frame_count = 0
    success, frame = video_capture.read()

    while success:
        if frame_count % frame_interval == 0:
            h, w, _ = frame.shape
            aspect_ratio = w / h
            target_aspect_ratio = frame_width / frame_height

            if aspect_ratio > target_aspect_ratio:
                new_width = int(h * target_aspect_ratio)
                x_start = (w - new_width) // 2
                cropped_frame = frame[:, x_start:x_start + new_width]
            else:
                new_height = int(w / target_aspect_ratio)
                y_start = (h - new_height) // 2
                cropped_frame = frame[y_start:y_start + new_height, :]

            resized_frame = cv2.resize(cropped_frame, (frame_width, frame_height))
            frames.append(resized_frame)
        frame_count += 1
        success, frame = video_capture.read()

    video_capture.release()

    if not frames:
        print("No frames extracted.")
        return

    total_frames = len(frames)
    sprite_sheet_width = frame_width * total_frames
    sprite_sheet_height = frame_height

    sprite_sheet = np.zeros((sprite_sheet_height, sprite_sheet_width, 3), dtype=np.uint8)

    for i, frame in enumerate(frames):
        x_offset = i * frame_width
        sprite_sheet[:, x_offset:x_offset + frame_width] = frame

    sprite_sheet_path = os.path.join(output_folder, "spritesheet.png")
    cv2.imwrite(sprite_sheet_path, sprite_sheet)

    animation_data = {
        "base_size": [sprite_sheet_width, sprite_sheet_height]
    }

    json_path = os.path.join(output_folder, "spritesheet.json")
    with open(json_path, "w") as json_file:
        json.dump(animation_data, json_file, indent=4)

    print(f"Generated sprite sheet and JSON in {output_folder}")
    print(f"Total frames created: {total_frames}")

mp4_file = "BrainrotPvP/clips/banner.mp4"
output_dir = "BrainrotPvP/textures/ui/banner"
extract_and_generate_spritesheet(mp4_file, output_dir, fps=10)