
const mapRange = (value: number, in_min: number, in_max: number, out_min: number, out_max: number): number => {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

const drawBranch = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    len: number,
    angle: number,
    depth: number,
    maxDepth: number,
    colorHue: number
) => {
    if (depth > maxDepth) return;

    ctx.beginPath();
    ctx.moveTo(x, y);

    const endX = x + len * Math.cos(angle);
    const endY = y + len * Math.sin(angle);
    ctx.lineTo(endX, endY);

    const saturation = mapRange(depth, 0, maxDepth, 100, 50);
    const lightness = mapRange(depth, 0, maxDepth, 70, 30);
    ctx.strokeStyle = `hsl(${colorHue}, ${saturation}%, ${lightness}%)`;
    ctx.lineWidth = mapRange(depth, 0, maxDepth, 5, 0.5);
    ctx.stroke();

    const newLen = len * 0.8;
    const angleVariance = mapRange(maxDepth, 4, 13, 0.3, 0.9);

    drawBranch(ctx, endX, endY, newLen, angle - angleVariance, depth + 1, maxDepth, colorHue);
    drawBranch(ctx, endX, endY, newLen, angle + angleVariance, depth + 1, maxDepth, colorHue);
};

export const drawFractal = (ctx: CanvasRenderingContext2D, painLevel: number) => {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';

    const startX = width / 2;
    const startY = height;
    const startLength = Math.min(width, height) * 0.2 * mapRange(painLevel, 0, 11, 0.8, 1.2);
    const startAngle = -Math.PI / 2;
    
    // Map pain level to fractal parameters
    const maxDepth = Math.floor(mapRange(painLevel, 0, 11, 4, 13));
    // Color shifts from cool blue (240) to fiery orange/red (20)
    const colorHue = mapRange(painLevel, 0, 11, 240, 20);

    drawBranch(ctx, startX, startY, startLength, startAngle, 0, maxDepth, colorHue);
};
