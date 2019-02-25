var ix, iy;
var idx = 0;
var grid = [];
var vertex = vec3.create();
var normal = vec3.create();

var indices = [];
var vertices = [];
var normals = [];
var texCoords = [];
var height = 25;
var heightSegments = 25;
var radius = 1.0;
var width = 25;
//Generate vertices, normals and texCoords 
for (iy = 0; iy <= height; ++iy) {
    var verticesRow = [];
    var v = iy / heightSegments;
    for (ix = 0; ix <= width; ++ix) {
        var u = ix / width;
        //Vertex 
        vertex[0] = -radius * Math.cos(u * Math.PI * 2.0) * Math.sin(v * Math.PI);
        vertex[1] = radius * Math.cos(v * Math.PI);
        vertex[2] = radius * Math.sin(u * Math.PI * 2.0) * Math.sin(v * Math.PI);
        vertices.push(vertex[0]);
        vertices.push(vertex[1]);
        vertices.push(vertex[2]);

        //Normal
        normal = vec3.clone(vertex);
        vec3.normalize(normal, normal);
        normals.push(normal[0]);
        normals.push(normal[1]);
        normals.push(normal[2]);
        //TexCoord 
        texCoords.push(u);
        texCoords.push(1.0 - v);
        verticesRow.push(idx++);
    }
    grid.push(verticesRow);
}
//Generate índices 
//Sorting of indices...(for triangles-strip) 
for (iy = 0; iy < height; ++iy) {
    for (ix = 0; ix < width; ++ix) {
        var a = grid[ iy ][ ix + 1 ];
        var b = grid[ iy ][ ix ];
        var c = grid[ iy + 1 ][ ix ];
        var d = grid[ iy + 1 ][ ix + 1 ];
        indices.push(a);
        indices.push(b);
        indices.push(d);
        indices.push(b);
        indices.push(c);
        indices.push(d);

    }
}