# ORM (Object-Relational Mapping) is a way to interact with relational databases by mapping database tables to objects in code. Used with Relational Databases (like MySQL, PostgreSQL, SQLite) where data is stored in tables (rows and columns).
Instead of writing raw SQL queries to interact with a database, ORM allows you to use classes and methods in your programming language.

1. Each table in a database can correspond to a class.
2. Each row in that table corresponds to an object.
3. Each column in a table corresponds to a property or attribute in the class.
<!-- "- Learn the differences in ORM and ODM.
- Advantages and disadvantages of using ORM.
- How to make efficient uses of ORM.
- Explore sqlbricks  ORM for RDBMS." -->

# Adv.

## Increased productivity: 
Developers spend less time writing SQL queries and can focus on writing application logic.

## Reduced complexity: 
Code is easier to read and maintain because database interactions are represented through standard language syntax.

# Disadv.

## Performance with Complex Queries: 
ORMs may struggle with advanced or complex queries, leading to inefficient SQL.

## Slower than Raw SQL: 
Due to abstraction layers, ORMs are generally slower than raw SQL, especially for high-performance applications.
internally, an ORM translates the high-level Java code (or code from any supported programming language) into SQL queries

## Database agnosticism: ORM makes it easier to switch between different relational databases (e.g., from MySQL to PostgreSQL) with minimal code changes.

# Example: 
Java => Hibernate, Apache OpenJPA
Python => Django, SQLAlchemy
PHP => Laravel

# Code
```
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class User {
    private Long id;
    private String name;
    private String email;

    // Constructor
    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```
# After conversion it will look like below
```
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```

# SQLBricks
SqlBricks is a Java-based library that facilitates building SQL statements programmatically in a type-safe way. It's not an ORM (Object-Relational Mapping) framework but rather a SQL construction library that helps you create SQL queries using Java code.

```
import org.sqlbricks.SqlBricks;
import org.sqlbricks.dsl.Select;
import static org.sqlbricks.dsl.Sql.*;

public class SqlBricksExample {
    public static void main(String[] args) {
        // Create a select query
        Select query = select(columns("id", "name", "email"))
                .from(table("users"))
                .where(field("age").gt(21))
                .orderBy(field("name").asc());

        // Generate the SQL string
        String sql = query.toString();

        // Output the generated SQL
        System.out.println(sql);
    }
}
```