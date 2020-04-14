package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.config;

import lombok.NonNull;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
public class DataSourceConfig {

	@Bean
	@ConfigurationProperties(prefix = "datasource.primary")
	@Primary
	@Profile("primary")
	public DataSource primaryDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean
	@ConfigurationProperties(prefix = "datasource.unittest")
	@Profile("test")
	public DataSource unitTestDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean
	public SqlSessionFactory sqlSessionFactory(@NonNull final DataSource dataSource) throws Exception {
		org.apache.ibatis.session.Configuration config = new org.apache.ibatis.session.Configuration();
		config.setMapUnderscoreToCamelCase(true);

		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource);
		sessionFactory.setConfiguration(config);
		return sessionFactory.getObject();
	}

}
