package ajax.model;

import java.io.InputStream;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MybatisEx {
	public static void main(String[] args) {
		String resource = "xml/mybatis-config.xml"; //org/mybatis/example/
		InputStream inputStream;
		try {
			inputStream = org.apache.ibatis.io.Resources.getResourceAsStream(resource);
			SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
			
			
			SqlSession session = sqlSessionFactory.openSession();
			
			String sql = "org.mybatis.example.BlogMapper.selectBlog";
			
			List<Blog> blogs = session.selectList(sql, 2);
			
			
			for (Blog blog : blogs) {
				System.out.println(blog.getTitle());
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}

