export class Vector3D {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    scalarMultiply(s: number): Vector3D {
        this.multiplyMembers(s);
        return this;
    }

    scalarDivide(s: number): Vector3D {
        s = 1.0 / s;
        this.multiplyMembers(s);
        return this;
    }

    dotProduct(b: Vector3D): number {
        const a = this;
        return (a.x * b.x + a.y * b.y + a.z * b.z);
    }

    crossProduct(b: Vector3D): Vector3D {
        const a = this;
        return new Vector3D(a.y * b.z - a.z * b.y,
                            a.z * b.x - a.x * b.z,
                            a.x * b.y - a.y * b.x);
    }

    add(v: Vector3D): Vector3D {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    sub(v: Vector3D): Vector3D {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    magnitude(v: Vector3D): number {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    normalize(v: Vector3D): Vector3D {
        const vMag = this.magnitude(v);
        return this.scalarDivide(vMag);
    }

    project(b: Vector3D): Vector3D {
        const a = this;
        const c = a.dotProduct(b) / b.dotProduct(b);
        return b.scalarMultiply(c);
    }

    reject(b: Vector3D): Vector3D {
        const a = this;
        return a.sub(a.reject(b));
    }

    private multiplyMembers(s: number) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    }
}
