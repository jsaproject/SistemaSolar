"use strict";

var ShaderProgram = function ( )
{
    this.shaders = [];
    this.uniformLocations = {};
};
ShaderProgram.prototype.createVertexShader = function (source)
{
    var shader = this.loadAndCompile(source, gl.VERTEX_SHADER);
    this.shaders.push(shader);
};
ShaderProgram.prototype.createFragmentShader = function (source)
{
    var shader = this.loadAndCompile(source, gl.FRAGMENT_SHADER);
    this.shaders.push(shader);
};
ShaderProgram.prototype.loadAndCompile = function (shaderSource, shaderType)
{
    if (shaderSource === null)
    {
        alert("WARNING: " + shaderSource + " failed");
        console.log(shaderSource);
        throw "SHADER ERROR";
    }
    return this.compileShader(shaderSource, shaderType);
};

ShaderProgram.prototype.setUniformVec3 = function (unif, v)
{
    gl.uniform3f(this.uniformLocations[ unif ], v[0], v[1], v[2]);
};

ShaderProgram.prototype.compileShader = function (shaderSource, shaderType)
{
    var compiledShader;
    if (shaderType == gl.VERTEX_SHADER)
    {
        this.vertexSource = shaderSource;
    } else if (shaderType == gl.FRAGMENT_SHADER)
    {
        this.fragmentSource = shaderSource;
    }
    // Creamos el shader
    compiledShader = gl.createShader(shaderType);
    // Compilamos el shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    // Consultamos si hay errores
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS))
    {
        alert("ERROR: " + gl.getShaderInfoLog(compiledShader));
        console.log("ERROR: " + gl.getShaderInfoLog(compiledShader));
        console.log(shaderSource);
        throw "SHADER ERROR";
    }
    return compiledShader;
};
ShaderProgram.prototype.compile = function ( )
{
    // Creamos y linkamos shaders
    this.mCompiledShader = gl.createProgram();
    for (var i = 0; i < this.shaders.length; i++)
    {
        gl.attachShader(this.mCompiledShader, this.shaders[i]);
    }
};
ShaderProgram.prototype.link = function ( )
{
    gl.linkProgram(this.mCompiledShader);
    // Consultamos errores
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS))
    {
        alert("ERROR");
        console.warn("Error in program linking:" +
                gl.getProgramInfoLog(this.mCompiledShader));
        throw "SHADER ERROR";
    }
};
ShaderProgram.prototype.bind = function ()
{
    gl.useProgram(this.mCompiledShader);
};
ShaderProgram.prototype.createUniform = function (unif)
{
    this.uniformLocations[unif] = gl.getUniformLocation(this.mCompiledShader, unif);
};
ShaderProgram.prototype.setUniform3f = function (unif, x, y, z)
{
    gl.uniform3f(this.uniformLocations[ unif ], x, y, z);
};
ShaderProgram.prototype.setUniformMat4 = function (unif, mat)
{
    gl.uniformMatrix4fv(this.uniformLocations[ unif ], false, mat);
};
ShaderProgram.prototype.setUniform1i = function (unif, value)
{
    gl.uniform1i(this.uniformLocations[ unif ], value);
};