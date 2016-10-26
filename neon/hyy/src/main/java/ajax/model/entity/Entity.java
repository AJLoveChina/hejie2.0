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

public class Entity<T> implements Iterable<T>,Iterator<T>, EntityInterface<T>{

	private String statusSplitByComma = "";
	
	private String dateEnteredOfSave = null;
	private String dateEnteredOfUpdate = null;
	private String dateEnteredOfDelete = null;
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getDateEnteredOfSave()
	 */
	public String getDateEnteredOfSave() {
		return dateEnteredOfSave;
	}
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#setDateEnteredOfSave(java.lang.String)
	 */
	public void setDateEnteredOfSave(String dateEnteredOfSave) {
		this.dateEnteredOfSave = dateEnteredOfSave;
	}
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getDateEnteredOfUpdate()
	 */
	public String getDateEnteredOfUpdate() {
		return dateEnteredOfUpdate;
	}
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#setDateEnteredOfUpdate(java.lang.String)
	 */
	public void setDateEnteredOfUpdate(String dateEnteredOfUpdate) {
		this.dateEnteredOfUpdate = dateEnteredOfUpdate;
	}
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getDateEnteredOfDelete()
	 */
	public String getDateEnteredOfDelete() {
		return dateEnteredOfDelete;
	}
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#setDateEnteredOfDelete(java.lang.String)
	 */
	public void setDateEnteredOfDelete(String dateEnteredOfDelete) {
		this.dateEnteredOfDelete = dateEnteredOfDelete;
	}
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getStatusSplitByComma()
	 */
	public String getStatusSplitByComma() {
		return statusSplitByComma;
	}
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#setStatusSplitByComma(java.lang.String)
	 */
	public void setStatusSplitByComma(String statusSplitByComma) {
		this.statusSplitByComma = statusSplitByComma;
	}
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#addItemStatus(ajax.model.ItemStatus)
	 */
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#addItemStatus(ajax.model.ItemStatus)
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
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#removeIemStatus(ajax.model.ItemStatus)
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
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#isInThisItemStatus(ajax.model.ItemStatus)
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
	
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getPrimaryKey()
	 */
	public String getPrimaryKey() {
		return HibernateUtil.getPrimaryKey(this.getClass());
	}
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#isSetPrimaryKeyValue()
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
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#save()
	 */
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
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#save(org.hibernate.Session)
	 */
	public void save(Session session) {
		this.modifySomeCommonFields(ModifyType.SAVE);
		session.save(this);
	}
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#update(org.hibernate.Session)
	 */
	public void update(Session session) {
		this.modifySomeCommonFields(ModifyType.UPDATE);
		session.update(this);
	}
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#delete(org.hibernate.Session)
	 */
	public void delete(Session session) {
		this.modifySomeCommonFields(ModifyType.DELETE);
		session.delete(this);
	}
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#update()
	 */
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
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#delete()
	 */
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
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getById(int)
	 */
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
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#load(int)
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
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#load(long)
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


	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getTableName()
	 */
	public String getTableName() {
		String tableName = HibernateUtil.getTableName(this.getClass());
		
		return tableName;
	}
	
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getPage(int, int)
	 */
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
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getList(org.hibernate.Criteria)
	 */
	@Deprecated
	public List<T> getList(Criteria criteria) {
		
		return criteria.list();
		
	}
	
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#toJson()
	 */
	public String toJson() {
		
		Gson gson = new Gson();
		
		return gson.toJson(this);
		
	}
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#getFormComponents(java.lang.Class)
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
	
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#iterator()
	 */
	@Override
	public Iterator<T> iterator() {
		
		return new Entity<T>();

	}
	
	private int iterator_page = 1;
	private int iterator_size = 1;
	private List<T> iterator_list;
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#hasNext()
	 */
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
	/* (non-Javadoc)
	 * @see ajax.model.entity.EntityInterface#next()
	 */
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
	
	
	public static void notThisStatus(Criteria criteria, ItemStatus itemStatus) {
		criteria.add(Restrictions.not(Restrictions.like("statusSplitByComma", "%" + itemStatus.wrapWithBE() + "%")));
	}

}
