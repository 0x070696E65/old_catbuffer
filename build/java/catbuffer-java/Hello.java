import io.nem.symbol.catapult.builders;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.function.Function;

public class Hello {

  /*public static ByteBuffer readByteBuffer(
    final DataInputStream stream,
    final int size
  )
    throws IOException {
    ByteBuffer buffer = ByteBuffer.allocate(size);
    stream.readFully(buffer.array());
    return buffer;
  }*/

  public static int getSize(List<UnresolvedAddressDto> restrictionAdditions) {
    int size = 0;
    size += AccountRestrictionFlagsDto.values()[0].getSize();
    size += 1; // restrictionAdditionsCount
    size += 1; // restrictionDeletionsCount
    size += 4; // accountRestrictionTransactionBody_Reserved1
    size += GeneratorUtils.getSumSize(restrictionAdditions, 0);
    return size;
  }

  
  public static void main(String[] args) throws Exception {
    String hex =
      "01009050B9837EFAB4BBE8A4B9BB32D812F9885C00D8FC1650E101000000000000000440020000000000000054415441";
    byte[] b = GeneratorUtils.hexToBytes(hex);

    ByteArrayInputStream is = null;
    DataInputStream dis = null;
    is = new ByteArrayInputStream(b);
    dis = new DataInputStream(is);

    AccountRestrictionsInfoBuilder accountRestrictionsInfoBuilder = new AccountRestrictionsInfoBuilder(dis);
    System.out.println(accountRestrictionsInfoBuilder);
    /*
    restrictionAdditions = GeneratorUtils.loadFromBinaryArray(
      UnresolvedAddressDto::loadFromBinary,
      dis,
      2,
      5
    );

    for (UnresolvedAddressDto i : restrictionAdditions) {
      for (byte l : i.serialize()) {
        System.out.println(l);
      }
      System.out.println("----------------------------");
    }
    int size = getSize(restrictionAdditions);
    System.out.println(size);
    */

    /*

    restrictionFlags =
    GeneratorUtils.toSet(
      AccountRestrictionFlagsDto.class,
      Short.reverseBytes(dis.readShort())
    );
    System.out.println(restrictionFlags);
    final byte restrictionAdditionsCount = dis.readByte();
    System.out.println(restrictionAdditionsCount);
    final byte restrictionDeletionsCount = dis.readByte();
    System.out.println(restrictionDeletionsCount);
    accountRestrictionTransactionBody_Reserved1 =
      Integer.reverseBytes(dis.readInt());
    System.out.println(accountRestrictionTransactionBody_Reserved1);
    restrictionAdditions =
      GeneratorUtils.loadFromBinaryArray(
        UnresolvedAddressDto::loadFromBinary,
        dis,
        restrictionAdditionsCount,
        0
      );
    System.out.println(restrictionAdditions);
    restrictionDeletions =
      GeneratorUtils.loadFromBinaryArray(
        UnresolvedAddressDto::loadFromBinary,
        dis,
        restrictionDeletionsCount,
        0
      );
    System.out.println(restrictionDeletions);
    */
    /*
    while( dis.available() >0) {

      //read one single byte
       byte c = dis.readByte();

      //print the byte
       System.out.print(c+" ");
    }
    */
    /*
    KeyDto keyDto = KeyDto.loadFromBinary(dis);
    byte[] result = keyDto.serialize();
    System.out.println(result);
    for (byte i : result) {
      System.out.println(i);
    }
    */
    /*
    ByteBuffer buffer = ByteBuffer.allocate(32);
    dis.readFully(buffer.array());
    byte[] bb = {};
    buffer.get(bb);
    System.out.print(bb[0]);
    for (byte i : bb){
      System.out.print(i);
    }
    */

    /*
     */
    /*
        // バイト配列を書き込み 
        baOutStr.write(byteData);
        
        // バイト出力ストリームに書き込みした内容を表示する 
        System.out.print("・バイト出力ストリームに書き込んだ内容:");
        
        // byte配列を取得し、文字に変換して表示する
        byte[] outData = baOutStr.toByteArray();
        for (byte bt : outData) {
            System.out.print((char) bt);
        }
        */
  }
  /*
  public static void isFalse(
    boolean expression,
    String message,
    Object... values
  ) {
    isTrue(!expression, message, values);
  }

  public static void isTrue(
    boolean expression,
    String message,
    Object... values
  ) {
    if (!expression) {
      throw new IllegalArgumentException(String.format(message, values));
    }
  }

  public static <T extends Enum<T> & BitMaskable> long toLong(
    final Class<T> enumClass,
    final Set<T> enumSet
  ) {
    final T[] enumValues = enumClass.getEnumConstants();
    isFalse(
      enumValues.length > Long.SIZE,
      "The number of enum constants is greater than " + Long.SIZE
    );
    long result = 0;
    for (final T value : enumValues) {
      if (enumSet.contains(value)) {
        result += value.getValueAsLong();
      }
    }
    return result;
  }
  */
}
