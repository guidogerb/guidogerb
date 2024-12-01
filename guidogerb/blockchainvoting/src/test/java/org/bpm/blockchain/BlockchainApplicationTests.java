package org.bpm.blockchain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.bpm.blockchain.contract.Block;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@SpringBootTest
class BlockchainApplicationTests {
    private static int validationWeight = 4;
    public static List<Block> chain = new ArrayList<>();
    String answer = new String(new char[validationWeight]).replace('\0', '0');


    @Test
    void contextLoads() {
        Block firstBlock = new Block("The is the first block.",new Date().getTime(), "Alpha");
        firstBlock.validateBlock();
        chain.add(firstBlock);
        Block first = new Block("Add one.",new Date().getTime(), firstBlock.getBlockHash());
        first.validateBlock();
        chain.add(first);
        testAddBlock();
        testBlockValid();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            log.debug(objectMapper.writeValueAsString(chain));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private void testAddBlock() {
        Block newBlock = new Block("The is a New Block.", new Date().getTime(), chain.get(chain.size() - 1)
                .getBlockHash());
        newBlock.validateBlock();
        if(!newBlock.getBlockHash()
                .substring(0, validationWeight)
                .equals(answer)) {
            throw new RuntimeException("block not added");
        }
        chain.add(newBlock);
    }

    private void testBlockValid() {
        boolean isValid = true;
        for (int i = 0; i < chain.size(); i++) {
            String previousBlockHash = i == 0 ? "Alpha"
                    : chain.get(i - 1)
                    .getBlockHash();
            isValid = chain.get(i)
                    .getBlockHash()
                    .equals(chain.get(i)
                            .calculateBlockHash())
                    && previousBlockHash.equals(chain.get(i)
                    .getPreviousBlockHash())
                    && chain.get(i)
                    .getBlockHash()
                    .substring(0, validationWeight)
                    .equals(answer);
            if (!isValid)
                break;
        }
        if(!isValid) {
            throw new RuntimeException("block is invalid");
        }
    }

}
