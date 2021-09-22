package com.bluepantsmedia.filesystem.util;

import org.apache.commons.codec.digest.DigestUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Sha {

    private Sha() {
    }

    public static byte[] getHash(String text) {
        MessageDigest digest = getSha256Digest();
        if (digest != null) {
            return digest.digest(text.getBytes(StandardCharsets.UTF_8));
        } else {
            return null;
        }
    }

    private static MessageDigest getSha256Digest() {
        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return digest;
    }

    public static String getHex(String text) {
        String sha256hex = org.apache.commons.codec.digest.DigestUtils.sha256Hex(text);
        return sha256hex;
    }

    public static String getFileChecksum(File file) throws IOException {
        MessageDigest digest = getSha256Digest();

        //Get file input stream for reading the file content
        FileInputStream fis = new FileInputStream(file);

        //Create byte array to read data in chunks
        byte[] byteArray = new byte[1024];
        int bytesCount = 0;

        //Read file data and update in message digest
        while ((bytesCount = fis.read(byteArray)) != -1) {
            digest.update(byteArray, 0, bytesCount);
        }
        ;

        //close the stream; We don't need it now.
        fis.close();

        //Get the hash's bytes
        byte[] bytes = digest.digest();

        //This bytes[] has bytes in decimal format;
        //Convert it to hexadecimal format
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }

        //return complete hash
        return sb.toString();
    }
}
