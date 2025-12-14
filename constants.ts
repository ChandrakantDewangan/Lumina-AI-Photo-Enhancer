export const APP_NAME = "Lumina AI";

export const POSITIVE_PROMPT = `
Enhance the uploaded photo while strictly preserving the original subject, identity, facial features, pose, composition, clothing, background, and overall structure. Do NOT change the person’s identity, face shape, body shape, age, gender, or add/remove any elements.

Apply professional-grade photo enhancement with realistic improvements only. Correct exposure, brightness, and contrast while maintaining natural realism. Improve color accuracy using true-to-life color science, balanced white balance, and natural skin tones (if humans are present).

Enhance lighting to look like high-quality studio or natural light, with soft shadows, smooth highlight roll-off, realistic light direction, and subtle depth. Apply gentle highlight bloom and soft glow where appropriate, without overexposure.

Increase clarity and sharpness carefully to reveal fine details and textures without creating noise, halos, or artificial sharpening artifacts. Preserve realistic skin texture—smooth imperfections slightly but avoid plastic or airbrushed appearance.

Improve dynamic range (HDR) while keeping shadows and highlights natural. Reduce noise and grain only where necessary, while preserving details. Add subtle, realistic depth of field enhancement if applicable, without blurring important elements.

Enhance overall composition subtly while keeping the original framing intact. Ensure clean edges, accurate proportions, and realistic reflections. Maintain a premium DSLR/mirrorless camera look with professional-quality output.

Apply modern cinematic color grading that is natural, balanced, and visually pleasing (not oversaturated). Maintain smooth tonal transitions and realistic contrast.

The final result must look like the same photo, just professionally enhanced—as if edited by an expert photographer using high-end photo editing software. Output should be ultra-realistic, high-resolution, clean, sharp, natural, and suitable for social media, professional use, printing, and portfolios.
`;

export const NEGATIVE_PROMPT = `
❌ STRICT NEGATIVE PROMPT:
change face, new face, different person, distorted face, extra fingers, extra limbs, deformed body, unrealistic anatomy, cartoon, anime, illustration, painting, AI look, plastic skin, over-smoothing, over-sharpening, noise, artifacts, watermark, logo, text, border, frame, fake lighting, unrealistic colors
`;