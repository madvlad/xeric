import { Vector4D } from "./Vector4D";

export class Matrix4D {
    public n: [[number, number, number, number],[number, number, number, number],[number, number, number, number],[number, number, number, number]];

    public a: Vector4D;
    public b: Vector4D;
    public c: Vector4D;
    public d: Vector4D;

    constructor(a: Vector4D, b: Vector4D, c: Vector4D, d: Vector4D) {
        this.n[0][0] = a.x; this.n[0][1] = a.y; this.n[0][2] = a.z; this.n[0][3] = a.w;
        this.n[1][0] = b.x; this.n[1][1] = b.y; this.n[1][2] = b.z; this.n[1][3] = b.w;
        this.n[2][0] = c.x; this.n[2][1] = c.y; this.n[2][2] = c.z; this.n[2][3] = c.w;
        this.n[3][0] = d.x; this.n[3][1] = d.y; this.n[3][2] = d.z; this.n[3][3] = d.w;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
}
