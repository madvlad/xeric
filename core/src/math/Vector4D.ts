export class Vector4D {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x; this.y = y; this.z = z; this.w = w;
    }

    scalarMultiply(s: number): Vector4D {
        this.multiplyMembers(s);
        return this;
    }

    scalarDivide(s: number): Vector4D {
        s = 1 / s;
        this.multiplyMembers(s);
        return this;
    }

    private multiplyMembers(s: number) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
    }
}
