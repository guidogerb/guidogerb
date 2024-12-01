package com.bluepantsmedia.dev.bridgegapp.application.config;

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
	@ConfigurationProperties(prefix = "datasource.hris")
	@Profile("hris")
	public DataSource hrisDataSource() {
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



/*
package com.bluepantsmedia.dev.bridgegapp.application.config;

import com.bluepantsmedia.dev.bridgegapp.application.enums.DestinationEnvironment;
import org.apache.commons.dbcp.BasicDataSource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;


@Configuration
public class DataSourceConfig {
	private static final String MSSQL_DRIVER_CLASS_NAME = "net.sourceforge.jtds.jdbc.Driver";
    private static final String ORACLE_DRIVER_CLASS_NAME = "oracle.jdbc.driver.OracleDriver";
	private static final String SQL_SESSION_FACTORY = "sqlSessionFactory";
	private static final String MAPPER_PACKAGE_HRIS = "com.bluepantsmedia.dev.bridgegapp.application.mappers";

	// only have one connection to the datasource
	private static BasicDataSource basicDataSource;

	@Bean
	public DataSource dataSource() {
		// don't use DriverManagerDataSource (https://mytechrepo.wordpress.com/2015/02/17/drivermanagerdatasource-vs-basicdatasource/)
		if (basicDataSource == null) {
			basicDataSource = new BasicDataSource();
			basicDataSource.setDriverClassName(MSSQL_DRIVER_CLASS_NAME);

			// Change CURRENT_ENVIRONMENT global variable to switch destination DB
			switch (DestinationEnvironment.CURRENT_ENVIRONMENT) {
				case LOCALHOST:
					System.out.println("Using local database");
					basicDataSource = new BasicDataSource();
					basicDataSource.setDriverClassName(ORACLE_DRIVER_CLASS_NAME);
					basicDataSource.setUrl("jdbc:oracle:thin:@localhost:1521:XE");
					basicDataSource.setUsername("garyg");
					basicDataSource.setPassword("garypass1");
					break;
				case HRIS_DEV:
                    System.out.println("Using HRIS dev database");
                    basicDataSource = new BasicDataSource();
                    basicDataSource.setDriverClassName(MSSQL_DRIVER_CLASS_NAME);
                    basicDataSource.setUrl("jdbc:jtds:sqlserver://localhost");
                    basicDataSource.setUsername("hris");
                    basicDataSource.setPassword("1bfg4E6kI60XM3j");
                    break;

				default:
					throw new RuntimeException("Unknown destination environment:" + DestinationEnvironment.CURRENT_ENVIRONMENT.toString());
			}





			// Don't comment these out
			basicDataSource.setMaxActive(100);
			basicDataSource.setMaxIdle(100);
		}

		return basicDataSource;
	}


	@Bean
	public DataSourceConfig databaseConfig() {
		return new DataSourceConfig();
	}

	@Bean
	public DataSourceTransactionManager transactionManagerHris() {
		return new DataSourceTransactionManager(databaseConfig().dataSource());
	}

	@Bean(name = SQL_SESSION_FACTORY)
	public SqlSessionFactoryBean sqlSessionFactory() {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(databaseConfig().dataSource());

		AppConfig.mybatisSettings(sqlSessionFactoryBean);

		return sqlSessionFactoryBean;
	}

	@Bean
	public MapperScannerConfigurer mapperScannerConfigurer() {
		MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
		mapperScannerConfigurer.setBasePackage(MAPPER_PACKAGE_HRIS);
		mapperScannerConfigurer.setSqlSessionFactoryBeanName(SQL_SESSION_FACTORY);
		return mapperScannerConfigurer;
	}
}
*/
