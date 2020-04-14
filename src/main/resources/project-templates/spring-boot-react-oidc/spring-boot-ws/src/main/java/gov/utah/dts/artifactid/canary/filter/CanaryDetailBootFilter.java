package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.canary.filter;

import com.bluepantsmedia.dev.bridgegappcanary.filter.CanaryDetailFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter("/canaryDetail/*")
public class CanaryDetailBootFilter extends CanaryDetailFilter {

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain fc) throws IOException, ServletException {
		super.doFilter(request,response,fc);
	}

}
