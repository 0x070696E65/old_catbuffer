from generators.common.FileGenerator import FileGenerator
from .CSHelper import CSHelper


class CSFileGenerator(FileGenerator):
    """C# file generator"""

    def init_code(self):
        code = super().init_code()
        return code

    def get_template_path(self):
        return '../cs/templates/'

    def get_static_templates_file_names(self):
        return ['GeneratorUtils', 'TransactionHelper',
                'EmbeddedTransactionHelper',
                'Serializer']

    def get_main_file_extension(self):
        return '.cs'

    def create_helper(self):
        return CSHelper()
