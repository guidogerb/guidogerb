package org.bpm.blockchain.contract;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Data
@Slf4j
public class Block {

    private int validationWeight = 4;

    private String blockHash;
    private String previousBlockHash;
    private String contract;
    private long timeStamp;
    private int nonce;

    public Block(String contract, long timeStamp, String previousBlockHash) {
        this.contract = contract;
        this.previousBlockHash = previousBlockHash;
        this.timeStamp = timeStamp;
        this.blockHash = calculateBlockHash();
    }

    public String validateBlock() {
        String answer = new String(new char[validationWeight]).replace('\0', '0');
        while (!blockHash.substring(0, validationWeight)
            .equals(answer)) {
            nonce++;
            blockHash = calculateBlockHash();
        }
        return blockHash;
    }

    public String calculateBlockHash() {
        final String blockData = contract + previousBlockHash + timeStamp + nonce;
        MessageDigest sha256 = null;
        byte[] blockBytes = null;
        try {
            sha256 = MessageDigest.getInstance("SHA-256");
            blockBytes = sha256.digest(blockData.getBytes("UTF-8"));
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException ex) {
            log.error(ex.getMessage());
        }
        StringBuffer sb = new StringBuffer();
        for (byte b : blockBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

}
