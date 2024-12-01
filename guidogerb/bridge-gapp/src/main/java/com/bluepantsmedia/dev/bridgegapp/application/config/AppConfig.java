package com.bluepantsmedia.dev.bridgegapp.application.config;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.bluepantsmedia.dev.bridgegapp.application"})
@MapperScan("com.bluepantsmedia.dev.bridgegapp.application.mappers")
public class AppConfig {

	/**
	 * add settings to mybatis, put in a global location since both configs call it
	 * @param sqlSessionFactoryBean the mybatis session factory bean to load up
	 */
	public static void mybatisSettings(SqlSessionFactoryBean sqlSessionFactoryBean) {
		// auto convert database columns to java fields!
		try {
			SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBean.getObject();
			sqlSessionFactory.getConfiguration().setMapUnderscoreToCamelCase(true);
			sqlSessionFactory.getConfiguration().setDefaultExecutorType(ExecutorType.BATCH);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
