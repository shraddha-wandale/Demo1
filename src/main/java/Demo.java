import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/demo")
public class Demo extends HttpServlet {
   @Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
        System.out.println("This is demo page");
   
        PrintWriter pw = resp.getWriter();
        pw.print("<h1>This is demo page</h1>");
        
        // `sendRedirect()` should be called before writing to response
//        resp.sendRedirect("https://www.geeksforgeeks.org/spring-mvc-framework");
        resp.sendRedirect("Test1");
    }
}
