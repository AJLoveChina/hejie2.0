package ajax.tools;

import com.aliyun.oss.OSSClient;

public class OssUtil {
	public static OSSClient getOssClient() {
		String endpoint = "http://images.nigeerhuo.com";
		String accessKeyId = Tools.getConfig("aliyunAccessKey");
		String accessKeySecret = Tools.getConfig("aliyunAccessSecret");

		OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);

		return client;
	}
	
	public static void close(OSSClient client) {
		client.shutdown();
	}
}
