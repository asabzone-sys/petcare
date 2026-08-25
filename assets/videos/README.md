# FurEver Care - Grooming Masterclass Video Directory

This directory contains all video assets used for the **FurEver Care Grooming Masterclass & Tutorials**.

## Video File Structure & Mapping

| Lesson Title | Default Video File | Category | Duration |
| :--- | :--- | :--- | :--- |
| **Stress-Free Undercoat Deshedding** | `grooming-brushing.mp4` | Coat Brushing | 8:45 |
| **Gentle Hydro-Massage Bath & Lick-Mat** | `grooming-bathing.mp4` | Bathing | 11:20 |
| **Safe Nail Grinding & Quick Identification** | `grooming-nails.mp4` | Nail Care | 6:15 |
| **Sanitary & Paw-Pad Fur Trimming** | `grooming-trimming.mp4` | Trimming | 9:50 |
| **Ear Canal Cleansing & Flushing** | `grooming-ears.mp4` | Ear Hygiene | 5:30 |
| **Hairball Reduction & Feline Brushing** | `grooming-feline.mp4` | Feline Brushing | 7:10 |
| **General Companion Care B-Roll** | `v1.mp4` | General | 1:15 |

## How to Change or Replace Videos

You can change any masterclass video using any of the following methods:

### Method 1: Replace MP4 Files in this Directory
1. Prepare your replacement video in **MP4 format** (H.264 video codec, AAC audio codec).
2. Save your file with the exact filename corresponding to the lesson (e.g. `grooming-brushing.mp4`).
3. Replace the existing file in `/assets/videos/`.

### Method 2: Configure via `data/grooming-videos.js`
Open `/data/grooming-videos.js` and update the `videoUrl` property for any lesson to point to your new file path or external CDN URL.

### Method 3: In-App Video Customizer (UI)
On the **Grooming Videos** page (`grooming-videos.html`), click the **"Custom Video Sources"** button to paste custom video URLs or select local video files to preview live in the player!
