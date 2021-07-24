package br.com.pwebi.ecommerce.config;

import com.google.common.base.Predicate;
import com.google.common.collect.Lists;
import io.swagger.models.auth.In;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static com.google.common.base.Predicates.not;
import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig implements WebMvcConfigurer {

    @Bean
    public Docket apiV1() {
        String version = "API v1.0";
        String apis = "br.com.pwebi.ecommerce";

        ApiInfo apiInfo = buildApiInfoBase().version(version).build();
        return buildApiBase().directModelSubstitute(LocalDateTime.class,
                String.class)
                .directModelSubstitute(LocalDate.class, String.class)
                .directModelSubstitute(LocalTime.class, String.class)
                .directModelSubstitute(ZonedDateTime.class, String.class).apiInfo(apiInfo).groupName(version)
                .tags(
                        new Tag("ecommerce", "ecommerce", 0)
                )
                .select()
                .apis(RequestHandlerSelectors.basePackage(apis))
                .paths(PathSelectors.any())
                .build();
    }

    private Docket buildApiBase() {
        List<ResponseMessage> defaultResponseMessageList = getDefaultResponseMessageList();
        return new Docket(DocumentationType.SWAGGER_2)
                .ignoredParameterTypes(Resource.class, InputStream.class)
                .select()
                .build()
                .useDefaultResponseMessages(false)
                .securityContexts(Lists.newArrayList(securityContext()))
                .securitySchemes(Lists.newArrayList(apiKey()))
                .useDefaultResponseMessages(false)
                .globalResponseMessage(RequestMethod.POST, defaultResponseMessageList)
                .globalResponseMessage(RequestMethod.PUT, defaultResponseMessageList)
                .globalResponseMessage(RequestMethod.GET, defaultResponseMessageList)
                .globalResponseMessage(RequestMethod.DELETE, defaultResponseMessageList)
                .globalResponseMessage(RequestMethod.PATCH, defaultResponseMessageList);
    }

    private ApiKey apiKey() {
        return new ApiKey("Bearer", HttpHeaders.AUTHORIZATION, In.HEADER.name());
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(securityContextPaths())
                .build();
    }

    @SuppressWarnings("Guava")
    private Predicate<String> securityContextPaths() {
        return or(regex("/v.*"),
                not(regex("/login")));
    }

    List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[]{authorizationScope};
        return Lists.newArrayList(new SecurityReference("Bearer", authorizationScopes));
    }

    private ApiInfoBuilder buildApiInfoBase() {
        return new ApiInfoBuilder()
                .title("Ecommerce - Ecommerce API")
                .description("API for control of ecommerce")
                .extensions(Collections.emptyList());
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/doc/**", "/swagger-ui.html").setKeepQueryParams(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

    private List<ResponseMessage> getDefaultResponseMessageList() {
        return Arrays.asList(
                new ResponseMessageBuilder().code(401).message("You are not authorized to view the resource.").build(),
                new ResponseMessageBuilder().code(403).message("Accessing the resource you were trying to reach is forbidden.").build(),
                new ResponseMessageBuilder().code(500).message("There was an internal error.").build());
    }
}
