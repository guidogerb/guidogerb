package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.canary.filter;

import com.bluepantsmedia.dev.bridgegappcanary.filter.CanaryFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter("/canary/*")
public class CanaryBootFilter extends CanaryFilter {

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain fc) throws IOException, ServletException {
		super.doFilter(request,response,fc);
	}

}
