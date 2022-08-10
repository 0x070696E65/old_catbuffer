namespace Symbol.Builders
    {
    public class VectorTest {

        public static string TEST_RESOURCES_VECTOR = "src/test/resources/vector";

/*
        public static class BuilderTestItem {

            public String filename;

            public String builder;

            public String payload;

            public String comment;

            public BuilderTestItem(String filename, String builder, String payload, String comment) {
                this.filename = filename;
                this.builder = builder;
                this.payload = payload;
                this.comment = comment;
            }

            public string ToString() {
                string commentSuffix = comment == null ? hash(payload) : comment;
                return filename + " - " + builder + " - "  + commentSuffix;
            }

            public static string Hash(string stringToHash) {
                try {
                    MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
                    messageDigest.update(stringToHash.getBytes());
                    return GeneratorUtils.toHex(messageDigest.digest());
                } catch (NoSuchAlgorithmException e) {
                    throw new IllegalArgumentException(e);
                }
            }
        }

        private static List<BuilderTestItem> Vectors() {
            List<Path> walk = Files.walk(Paths.get(TEST_RESOURCES_VECTOR)).collect(Collectors.toList());
            try (Stream<Path> paths = walk.stream()) {
                return paths
                    .filter(Files::isRegularFile).map(Path::toFile)
                    .flatMap(VectorTest::getVectorFromFile).collect(Collectors.toList());
            }
        }

        private static Stream<BuilderTestItem> getVectorFromFile(File file) {
            try {
                InputStream input = new FileInputStream(file);
                Yaml yaml = new Yaml();
                List<Map<String, String>> data = yaml.load(input);
                return data.stream().map(
                    stringStringMap -> {
                        String payload = Objects.toString(stringStringMap.get("payload"));
                        return new BuilderTestItem(file.getName(),
                            stringStringMap.get("builder"),
                            payload,
                            stringStringMap.get("comment"));
                    });
            } catch (Exception e) {
                throw new IllegalStateException(e);
            }
        }

        public void serialization(BuilderTestItem item) {
            try {
                String className = this.getClass().getPackage().getName() + "." + item.builder;
                DataInputStream inputStream = new DataInputStream(
                    new ByteArrayInputStream(GeneratorUtils.hexToBytes(item.payload)));
                Serializer serializer = (Serializer) Class.forName(className)
                    .getMethod("loadFromBinary", DataInputStream.class).invoke(null,
                        inputStream);
                Assertions.assertEquals(item.payload.toUpperCase(), GeneratorUtils.toHex(serializer.serialize()).toUpperCase());
                Assertions.assertEquals(item.payload.length() / 2, serializer.getSize());
            } catch (RuntimeException | ClassNotFoundException | NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
                Assertions
                    .fail("Cannot run test " + item + " Error: " + ExceptionUtils.readStackTrace(e));
            }

        }
*/
    }
}