package ajax.model.entity;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.hibernate.metadata.ClassMetadata;

import com.google.gson.Gson;

import ajax.model.ConfigFromProperties;
import ajax.model.FormComponents;
import ajax.model.ItemStatus;
import ajax.model.UrlRoute;
import ajax.model.FormComponents.Component;
import ajax.model.annotations.FormComponentAnno;
import ajax.model.annotations.FormComponentUrlAnno;
import ajax.model.exception.AJRunTimeException;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

public class Entity<T> implements Iterable<T>,Iterator<T>{

	private String statusSplitByComma = "";
	
	private String dateEnteredOfSave = null;
	private String dateEnteredOfUpdate = null;
	private String dateEnteredOfDelete = null;
	
	/**
	 * 这是为实体类准备的公用字段, 由于历史遗留问题, 有些类的这些值可能为null<br>
	 * 如果实体类自定义类似的字段, 比如 dateEntered, 您应当使用实体类(子类)自定义的字段.因为有这些字段的类基本都是2016.9.18之前何杰写的, 而且它们对应的数据表中往往不存在如下的几个字段<br>
	 * 我们约定9.18之后, 所有的类如果在数据表中定义了 保存, 修改, 删除时间字段, 请使用如下的字段名称.不要重新在子类中定义相关时间字段.谢谢
	 */
	public String getDateEnteredOfSave() {
		return dateEnteredOfSave;
	}
	public void setDateEnteredOfSave(String dateEnteredOfSave) {
		this.dateEnteredOfSave = dateEnteredOfSave;
	}
	/**
	 * 这是为实体类准备的公用字段, 由于历史遗留问题, 有些类的这些值可能为null<br>
	 * 如果实体类自定义类似的字段, 比如 dateEntered, 您应当使用实体类(子类)自定义的字段.因为有这些字段的类基本都是2016.9.18之前何杰写的, 而且它们对应的数据表中往往不存在如下的几个字段<br>
	 * 我们约定9.18之后, 所有的类如果在数据表中定义了 保存, 修改, 删除时间字段, 请使用如下的字段名称.不要重新在子类中定义相关时间字段.谢谢
	 */
	public String getDateEnteredOfUpdate() {
		return dateEnteredOfUpdate;
	}
	public void setDateEnteredOfUpdate(String dateEnteredOfUpdate) {
		this.dateEnteredOfUpdate = dateEnteredOfUpdate;
	}
	/**
	 * 这是为实体类准备的公用字段, 由于历史遗留问题, 有些类的这些值可能为null<br>
	 * 如果实体类自定义类似的字段, 比如 dateEntered, 您应当使用实体类(子类)自定义的字段.因为有这些字段的类基本都是2016.9.18之前何杰写的, 而且它们对应的数据表中往往不存在如下的几个字段<br>
	 * 我们约定9.18之后, 所有的类如果在数据表中定义了 保存, 修改, 删除时间字段, 请使用如下的字段名称.不要重新在子类中定义相关时间字段.谢谢
	 */
	public String getDateEnteredOfDelete() {
		return dateEnteredOfDelete;
	}
	public void setDateEnteredOfDelete(String dateEnteredOfDelete) {
		this.dateEnteredOfDelete = dateEnteredOfDelete;
	}
	public String getStatusSplitByComma() {
		return statusSplitByComma;
	}
	public void setStatusSplitByComma(String statusSplitByComma) {
		this.statusSplitByComma = statusSplitByComma;
	}
	
	/**
	 * 给item添加状态, 支持多状态  <br>
	 * 每个状态以 b开头, e结尾 . 为了防止  sql查询时出现   2,3,12  contains 1 出现true的情况<br>
	 * this method not do update
	 * @param itemStatus
	 */
	public void addItemStatus(ItemStatus itemStatus) {
		if (this.statusSplitByComma == null || this.statusSplitByComma.equals("")) {
			this.setStatusSplitByComma(itemStatus.wrapWithBE());
		} else if (!this.isInThisItemStatus(itemStatus)){
			String[] arr = this.statusSplitByComma.split(",");
			List<String> list = new ArrayList<String>();
			for (String s : arr) {
				list.add(s.trim());
			}
			list.add(itemStatus.wrapWithBE());
			this.setStatusSplitByComma(Tools.join(list, ","));
		}
	}
	
	/**
	 * 删除某个状态
	 * @param itemStatus
	 */
	public void removeIemStatus(ItemStatus itemStatus) {
		String str = itemStatus.wrapWithBE();
		this.setStatusSplitByComma(this.getStatusSplitByComma().replaceAll(str, ""));
		String[] arr = this.statusSplitByComma.split(",");
		List<String> list = new ArrayList<String>();
		for(String one : arr) {
			if (!one.equals("")) {
				list.add(one);
			}
		}
		this.setStatusSplitByComma(Tools.join(list, ","));
	}
	
	/**
	 * item是否处于某种指定状态
	 * @param itemStatus
	 * @return
	 */
	public boolean isInThisItemStatus(ItemStatus itemStatus) {
		if (this.statusSplitByComma == null || itemStatus == null) {
			return false;
		}
		String[] arr = this.statusSplitByComma.split(",");
		for (String s : arr) {
			if (s.equals(itemStatus.wrapWithBE())) {
				return true;
			}
		}
		return false;
	}
	
	
	public String getPrimaryKey() {
		ClassMetadata meta = HibernateUtil.getSessionFactory().getClassMetadata(this.getClass());
		return meta.getIdentifierPropertyName();
	}
	/**
	 * 是否设置了主键的值<br>
	 * 用来判断一个entity应该save 还是 update
	 * @return
	 */
	public boolean isSetPrimaryKeyValue() {
		String key = this.getPrimaryKey();
		String methodName = "get" + key.substring(0, 1).toUpperCase() + key.substring(1);
		try {
			Method method = this.getClass().getDeclaredMethod(methodName);
			
			int id = (Integer) method.invoke(this);
			
			return id > 0 ? true : false;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	/**
	 * 给实体类一些公用的字段赋值, 例如保存, 修改, 删除等时间
	 */
	private void modifySomeCommonFields(ModifyType type) {
		String date = new SimpleDateFormat(ConfigFromProperties.getTABLE_TIME_FORMAT()).format(new Date());
		
		switch(type) {
		case SAVE:
			this.dateEnteredOfSave = date;
			break;
		case DELETE:
			this.dateEnteredOfDelete = date;
			break;
		case UPDATE:
			this.dateEnteredOfUpdate = date;
			break;
		}
	}
	private enum ModifyType {
		SAVE, DELETE, UPDATE;
	}
	public boolean save() {
		Session session = HibernateUtil.getCurrentSession();
		try {
			
			session.beginTransaction();
			
			this.modifySomeCommonFields(ModifyType.SAVE);
			session.save(this);
			
			session.getTransaction().commit();
			
			return true;
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
		
	}
	
	public void save(Session session) {
		this.modifySomeCommonFields(ModifyType.SAVE);
		session.save(this);
	}
	public void update(Session session) {
		this.modifySomeCommonFields(ModifyType.UPDATE);
		session.update(this);
	}
	public void delete(Session session) {
		this.modifySomeCommonFields(ModifyType.DELETE);
		session.delete(this);
	}
	
	public boolean update() {
		Session session = HibernateUtil.getCurrentSession();
		
		try {
			session.beginTransaction();
			
			this.modifySomeCommonFields(ModifyType.UPDATE);
			session.update(this);
			
			session.getTransaction().commit();
			
			return true;
		} catch (Exception e) {
			
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	public boolean delete() {
		try {
			Session session = HibernateUtil.getCurrentSession();
			
			session.beginTransaction();
			
			this.modifySomeCommonFields(ModifyType.DELETE);
			session.delete(this);
			
			session.getTransaction().commit();
			return true;
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	@Deprecated
	public T getById(int id) {
		Session session = HibernateUtil.getCurrentSession();
		
		
		session.beginTransaction();
		
		String tableName = this.getTableName();
		// %s is not real table name , but is Java Type
		String sqlCmd = String.format("from %s where id = :id", this.getClass().getName());
		Query query = session.createQuery(sqlCmd);
		
		query.setInteger("id", id);
	
		T entity = (T)query.uniqueResult();
		
		//HibernateUtil.closeSession(session);
		session.getTransaction().commit();
		
		return entity;
	}
	
	/**
	 * 根据主键id值从数据库加载该实体对象
	 * @param id
	 */
	public boolean load(int id) {
		
		
		try {
			Session session = HibernateUtil.getCurrentSession();
			
			session.beginTransaction();
			session.load(this, id);
			session.getTransaction().commit();
			return true;
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	/**
	 * 根据主键id值从数据库加载该实体对象
	 * @param id
	 */
	public boolean load(long id) {
		
		
		try {
			Session session = HibernateUtil.getCurrentSession();
			
			session.beginTransaction();
			session.load(this, id);
			session.getTransaction().commit();
			return true;
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	/**
	 * 根据某个字段的值获取一个实体, 只返回找到的第一个. null if not find.
	 * @param column
	 * @param columnValue
	 * @param cls
	 * @return
	 */
	public static <T> T getBy(String column, Object columnValue, Class<T> cls) {
		
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria cr = session.createCriteria(cls);
		
		cr.add(Restrictions.eq(column, columnValue));
		
		List<T> list = cr.list();
		
		session.getTransaction().commit();
		
		if (list.size() > 0) {
			return list.get(0);
		} else {
			return null;
		}
	}
	
	/**
	 * 多条件限制查询
	 * @param cls
	 * @param keyValue  必须是 一个String类型接一个Object类型, 等等同理...
	 * @return null if no result or keyValue format error
	 */
	public static <T> T getBy(Class<T> cls, Object ... keyValue ) {
		if (keyValue.length < 2 || keyValue.length % 2 != 0) {
			return null;
		}
		
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria cr = session.createCriteria(cls);
		
		int i = 0;
		while(i < keyValue.length) {
			cr.add(Restrictions.eq((String)keyValue[i], keyValue[i+1]));
			i += 2;
		}
		
		List<T> list = cr.list();
		
		session.getTransaction().commit();
		
		if (list.size() > 0) {
			return list.get(0);
		} else {
			return null;
		}
	}	
	
	/**
	 * 根据字段查询是否存在该行数据
	 * @param column
	 * @param columnValue
	 * @param cls
	 * @return
	 */
	public static <T> boolean isExist(String column, String columnValue, Class<T> cls) {
		T t = getBy(column, columnValue, cls);
		return t != null;
	}
	
	
	public static boolean isExist(String column, Object value, Class<?> cls) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		Criteria criteria = session.createCriteria(cls);
		criteria.add(Restrictions.eq(column, value));
		
		try {
			int size = criteria.list().size();
			
			session.getTransaction().commit();
			return size > 0;
		} catch (Exception ex) {
			return false;
		}
		
	}


	public String getTableName() {
		String tableName = HibernateUtil.getTableName(this.getClass());
		
		return tableName;
	}
	
	
	@Deprecated
	public List<T> getPage(int page, int pageNum) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		String sqlCmd = String.format("from %s", this.getClass().getName());
		//, (page - 1) * pageNum, pageNum
		
		Query query = session.createQuery(sqlCmd);
		query.setFirstResult((page - 1) * pageNum);
		query.setMaxResults(pageNum);
		
		
		List<T> lists = query.list();
		
		session.getTransaction().commit();
		
		return lists;
	}
	
	/**
	 * return list of T, empty list if not found
	 * @param page
	 * @param size
	 * @param cls
	 * @return
	 */
	@Deprecated
	public static <T> List<T> get(int page, int size, Class<T> cls) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria  cr = session.createCriteria(cls);
		cr.setMaxResults(size);
		cr.setFirstResult((page - 1) * size);
		List<T> list = cr.list();
		
		
		//HibernateUtil.closeSession(session);
		session.getTransaction().commit();
		
		return list;
	}
	
	@Deprecated
	public List<T> getList(Criteria criteria) {
		
		return criteria.list();
		
	}
	
	
	public String toJson() {
		
		Gson gson = new Gson();
		
		return gson.toJson(this);
		
	}
	
	/**
	 * 快速得到表单组件, 在相应的jsp页面中渲染
	 * @param cls
	 * @return
	 * @throws AJRunTimeException
	 */
	public FormComponents getFormComponents(Class<T> cls) throws AJRunTimeException{
		FormComponentUrlAnno formComponentUrlAnno = cls.getAnnotation(FormComponentUrlAnno.class);
		
		if (formComponentUrlAnno == null) {
			throw new AJRunTimeException("The class should have formComponentAnno with!");
		}
		String urlSubmit = formComponentUrlAnno.submitUrl();
		String urlDelete = formComponentUrlAnno.deleteUrl();
		
		if (urlSubmit.equals("") && urlDelete.equals("")) {
			throw new AJRunTimeException("urlsubmit and urldelete can not be both empty!");
		}
		
		
		FormComponents formComponents = new FormComponents(urlSubmit, urlDelete);
		List<FormComponents.Component> components = new ArrayList<FormComponents.Component>();
		
		Field[] fields = cls.getDeclaredFields();
		for (Field field : fields) {
			
			FormComponentAnno formComponentAnno = field.getAnnotation(FormComponentAnno.class);
			String desc = "";
			FormComponents.ComponentType componentType = FormComponents.ComponentType.TEXT;
			boolean isHidden = false;
			boolean isDisabled = false;
			boolean isDiscard = true;
			String methodToGetValue = "";
			if (formComponentAnno != null) {
				desc = formComponentAnno.desc();
				componentType = formComponentAnno.componentType();
				isHidden = formComponentAnno.isHidden();
				isDisabled = formComponentAnno.isDisabled();
				isDiscard = formComponentAnno.isDiscard();
				methodToGetValue = formComponentAnno.getValueFromMethod();
			}
			if (isDiscard) {
				continue;
			}
			
			if (methodToGetValue.equals("")) {
				components.add(formComponents.new Component(field.getName(), Tools.getFieldValue(field, this) + "", desc, isHidden, isDisabled, isDiscard, componentType));
			} else {
				components.add(formComponents.new Component(field.getName(), Tools.getMethodValue(methodToGetValue, this) + "", desc, isHidden, isDisabled, isDiscard, componentType));
			}
			
		}
		
		formComponents.setComponents(components);
		
		return formComponents;
	}
	
	/**
	 * 一个个迭代数据表中的所有元素
	 */
	@Override
	public Iterator<T> iterator() {
		
		return new Entity<T>();

	}
	
	private int iterator_page = 1;
	private int iterator_size = 1;
	private List<T> iterator_list;
	@Override
	public boolean hasNext() {
		Session session = HibernateUtil.getCurrentSession();
		session.beginTransaction();
		Criteria criteria = session.createCriteria(this.getClass());
		
		criteria.setFirstResult((iterator_page - 1) * iterator_size);
		criteria.setMaxResults(iterator_size);
		iterator_list = criteria.list();
		
		iterator_page ++;
		session.getTransaction().commit();
		return iterator_list.size() > 0;
	}
	@Override
	public T next() {
		return iterator_list.get(0);
	}
	
	/**
	 * @param cls
	 * @param id
	 * @return null if not found
	 */
	public static <T> T get(Class<T> cls, int id) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		T t = session.get(cls, id);
		
		session.getTransaction().commit();
		
		return t;
	}
	
	/**
	 * 
	 * @param cls
	 * @param id
	 * @return null if not found
	 */
	public static <T> T get(Class<T> cls, long id) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		T t = session.get(cls, id);
		
		session.getTransaction().commit();
		
		return t;
	}

}
