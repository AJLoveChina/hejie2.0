-1. itemtest itype 改成 int类型
-2. itemtest 添加 userid 字段
-3. users 表 id字段类型改成 bigint
-4. collect 表userid 改成 bigint类型
-5. exam 表 userid 改成 bigint类型
-6. users accessToken 改成text类型 否则googletoken 太长了 1124字符
-7. 添加comments表


-8. create blogs 表
-9. comments 表字段不可以为 desc
-10. users表添加  canWriteBlogs and prncilName (以及索引)


--11.tbkItemsPC and tbkItemsWap table
--12.tbkitemsPC and tbkitemswap table add fields
--13.coupon table
--14.taobaoexcelitem table

!!!!!!!!!!!!!!!!!!!注意上线前执行一下SwichProjectMode.java程序, 切换到服务端状态!!!!!!!!!!!!!!!!!!