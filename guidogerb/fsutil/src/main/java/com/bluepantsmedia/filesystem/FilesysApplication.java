package com.bluepantsmedia.filesystem;

import com.bluepantsmedia.filesystem.model.Exts;
import com.bluepantsmedia.filesystem.model.FileInfo;
import com.bluepantsmedia.filesystem.repository.ExtsRepository;
import com.bluepantsmedia.filesystem.repository.FileInfoRepository;
import com.bluepantsmedia.filesystem.util.Sha;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NonNull;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class FilesysApplication implements CommandLineRunner {

	private static final Integer DIR_DEPTH = Integer.MAX_VALUE;
	private static final String BASE_PATH = "Z:\\garygerber\\Drive\\Que";
	private static final String CLOUD_BASE_PATH = "/var/services/homes/garygerber/Drive/Que";
	private static final String SEPARATOR = "\\";
	private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
	private static final DateTimeFormatter formatterMysql = DateTimeFormatter.ISO_DATE_TIME;


	@Autowired
	private ExtsRepository extsRepository;

	@Autowired
	private FileInfoRepository fileInfoRepository;

	private static Logger LOG = LoggerFactory
			.getLogger(FilesysApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(FilesysApplication.class, args);
	}

	@Override
	public void run(String... args) {
		LOG.info("EXECUTING : processFiles()");
		processFiles();
	}

	private String removeTags(@NonNull String input) {
		return input.replaceAll("\\<.*?\\>", "");
	}

	private void processFiles() {
		List<Path> result = new ArrayList<>();
		try (Stream<Path> pathStream = Files.find(Paths.get(BASE_PATH), DIR_DEPTH,
							((filePath, fileAttr) -> {
								return fileAttr.isRegularFile();
							})) // , FileVisitOption.FOLLOW_LINKS)
		) {
			result = pathStream.collect(Collectors.toList());
		} catch (IOException e) {
			e.printStackTrace();
		}
		result.forEach(path -> {
			try {
				FileInfo fileInfo = new FileInfo();
				BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);
				boolean isFile = attrs.isRegularFile();
				boolean isSymLink = attrs.isSymbolicLink();
				boolean isOther = attrs.isOther();
				if(isFile && !isSymLink && !isOther) {
					fileInfo.setFileName(path.toFile().getName());
					fileInfo.setFileSize(Files.size(path));
					fileInfo.setCreated(new Date(attrs.creationTime().toInstant().toEpochMilli()));
					fileInfo.setModified(new Date(attrs.lastModifiedTime().toInstant().toEpochMilli()));
					fileInfo.setAccessed(new Date(attrs.lastAccessTime().toInstant().toEpochMilli()));
					fileInfo.setShaHash(Sha.getFileChecksum(path.toFile()));
					String rootPath = path.toString().replace(BASE_PATH + SEPARATOR, "");
					String ext = FilenameUtils.getExtension(fileInfo.getFileName());
					Exts exts = extsRepository.findByExt(ext);
					if(exts == null) {
						exts = new Exts();
						exts.setExt(ext);
						exts.setDescription("");
						exts = extsRepository.save(exts);
					}
					fileInfo.setExt(exts);
					fileInfo.setOriginalLinuxFileLocation(CLOUD_BASE_PATH + "/" + rootPath.replace("\\", "/"));
					fileInfo.setOriginalWindowsFileLocation(path.toString());
					try {
						fileInfoRepository.save(fileInfo);
						LOG.info(fileInfo.toString());
					}
					catch (Exception e) {
					}
				}
				else {
					LOG.info("Not file: " + path.toString());
				}
			}
			catch (Exception e) {
				LOG.error(e.toString());
				e.printStackTrace(System.out);
			}
		});
	}

	private void testGetSum() {
		List<Path> result = new ArrayList<>();
		try (Stream<Path> pathStream = Files.find(Paths.get("Z:\\garygerber\\Drive\\Thumbs.db"), DIR_DEPTH,
				((filePath, fileAttr) -> {
					return fileAttr.isRegularFile();
				})) // , FileVisitOption.FOLLOW_LINKS)
		) {
			result = pathStream.collect(Collectors.toList());
			result.forEach(path -> {
				try {
					String hash = Sha.getFileChecksum(path.toFile());
					LOG.info(hash);
				} catch (Exception e) {
					e.printStackTrace(System.out);
				}
			});
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	private void logFileAttributes(BasicFileAttributes fileAttr) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			String json = mapper.writeValueAsString(fileAttr);
			LOG.info("ResultingJSONstring = " + json);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
}
