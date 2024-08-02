package et.com.core.servlets;

import com.google.gson.Gson;
import et.com.core.services.ProviderService;
import et.com.core.api.MedicalProviders;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.servlet.Servlet;
import java.io.IOException;

@Component(
    service = Servlet.class,
    property = {
        "sling.servlet.paths=/bin/fetchProviderData",
        "sling.servlet.methods=GET"
    }
)
public class ProviderDataServlet extends SlingAllMethodsServlet {

    @Reference
    private transient ProviderService providerService;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
        MedicalProviders providers = providerService.getProviderData();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
        Gson gson = new Gson();
        String json = gson.toJson(providers);
        response.getWriter().write(json);
    }
}
