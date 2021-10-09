package com.fpt.service.impl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fpt.service.FileStorageServie;

@Service
@Transactional
public class FileStorageServieImpl implements FileStorageServie{

	private final Path root = Paths.get("src/main/resources/static/image");
	@Override
	public void init() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String save(MultipartFile file) {
		String fileName = null;
		if(file != null) {
			try {
				fileName = new Date().getTime() + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
				Files.copy(file.getInputStream(), this.root.resolve(fileName));
			} catch (Exception e) {
				throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
			}
		}
		return fileName;
	}

	@Override
	public Resource load(String fileName) {
	    try {
	        Path file = root.resolve(fileName);
	        Resource resource = new UrlResource(file.toUri());

	        if (resource.exists() || resource.isReadable()) {
	          return resource;
	        } else {
	          throw new RuntimeException("Could not read the file!");
	        }
	      } catch (MalformedURLException e) {
	        throw new RuntimeException("Error: " + e.getMessage());
	      }
	}

	@Override
	public void deleteAll() {
	    FileSystemUtils.deleteRecursively(root.toFile());
		
	}

	@Override
	public Stream<Path> loadAll() {
		 try {
		      return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
		    } catch (IOException e) {
		      throw new RuntimeException("Could not load the files!");
		    }
		  }

}
