package com.bluepantsmedia.filesystem;

import com.bluepantsmedia.filesystem.model.Exts;
import com.bluepantsmedia.filesystem.repository.ExtsRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest
class FilesysApplicationTests {

	@Autowired
	private ExtsRepository extsRepository;

	//@Test
	public void testFetchData(){
		Exts ext1= new Exts("doc", "doc desc");
		Exts ext2= new Exts("txt", "txt desc");
		//save user, verify has ID value after save
		assertNull(ext1.getId());
		assertNull(ext2.getId());//null before save
		this.extsRepository.save(ext1);
		this.extsRepository.save(ext2);
		assertNotNull(ext1.getId());
		assertNotNull(ext2.getId());
		/*Test data retrieval*/
		ext1 = extsRepository.findByExt("doc");
		assertNotNull(ext1);
		assertEquals("doc desc", ext1.getDescription());
		Iterable<Exts> exts = extsRepository.findAll();
		int count = 0;
		for(Exts p : exts){
			count++;
		}
		assertEquals(count, 2);
	}

	@Test
	void contextLoads() {
	}

}
