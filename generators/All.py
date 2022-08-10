from generators.cpp_builder.BuilderGenerator import BuilderGenerator
from generators.java.JavaFileGenerator import JavaFileGenerator
from generators.typescript.TypescriptFileGenerator import TypescriptFileGenerator
from generators.python.PythonFileGenerator import PythonFileGenerator
from generators.cs.CSFileGenerator import CSFileGenerator

AVAILABLE_GENERATORS = {
    'cpp_builder': BuilderGenerator,
    'java': JavaFileGenerator,
    'typescript': TypescriptFileGenerator,
    'python': PythonFileGenerator,
    'cs': CSFileGenerator,
}
