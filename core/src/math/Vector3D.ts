export class Vector3D {
    public x: number;
    public y: number;
    public z: number;
    
    scalarMultiply(s: number): Vector3D {
        this.multiplyMembers(s);
        return this;
    }

    scalarDivide(s: number): Vector3D {
        s = 1.0 / s;
        this.multiplyMembers(s);
        return this;
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

    private multiplyMembers(s: number) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    }
}