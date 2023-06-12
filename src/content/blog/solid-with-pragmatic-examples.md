---
title: "SOLID, a pragmatic approach to understand it"
pubDatetime: 2024-02-06T12:45:00.000Z
featured: true
tags:
  - solid
  - design
  - tests
---

I have already seen numerous posts about SOLID. However, they are always too
abstract and distant from a developer's daily routine. After 13 years as a
software developer, I have decided to share my humble opinion and make it more
practical.

## Single Responsibility Principle (SRP)

This is self explanatory.

## Interface Segregation Principle (ISP)

**Tip:** Avoid wasting time trying to isolate interfaces until you actually
require it. Classes that implement unused interfaces will become apparent.

## Dependency Inversion Principle (DIP)

If you don't write tests, you'll never understand the true meaning of this
principle. Don't put concrete implementations of dependencies inside your code;
use interfaces and inject them.

**Tip:** Start writing unit tests to feel the need for interfaces in the
constructor.

## Liskov substitution principle (LSP)

The best way to learn this principle is to choose a database or any other
external dependency and try to replace it. Without implementing an Adapter
design principle, it's almost impossible to replace it without breaking the
code. Let's clarify this with a code example:

```js
class Database {
    private adapter;

    constructor(adapter) {
        this.adapter = adapter;
    }

    select(table_name, number_of_rows) {
        this.adapter.select(table_name, number_of_rows);
    }
}

class SQLServerAdapter implements Adapter {
    select(table_name, number_of_rows) {
        `SELECT TOP ${number_of_rows} * FROM ${table_name}`);
    }
}

class PostgresAdapter implements Adapter {
    select(table_name, number_of_rows) {
        `SELECT * FROM ${table_name} LIMIT ${number_of_rows}`;
    }
}
```

**Tip:** Now, every time you choose an external service or a class that could
have more than one implementation, you can evaluate if it is a good decision to
make it interchangeable.

## Open/Closed principle (OCP)

If you start thinking about interchangeable classes (LSP), you don't need to
worry about this principle because naturally you are going to implement it.

In the example above, you can see that. But let's mess up with the design to
violate the principle.

```js
class Database {
  private db;

  constructor() {
    this.db = new SQLServer();
  }

  select(table_name, number_of_rows) {
      this.db.raw(
              `SELECT TOP ${number_of_rows} * FROM ${table_name}`);
      )
  }
}
```

Now, the only way to replace the database with PostgreSQL is by changing the
code, violating the principle. The code should be open for new functions but
closed to modify existing ones.

**Tip:** Do the most closed abstractions in your business core code need to be
modified to maintain the same behavior? If yes, you are not following the
principle.

# Conclusion

The SOLID principles weren't created to make your code more fancy or complex.
They are principles that naturally emerge from making good design choices.

The pitfall that most people fall into is trying to apply the principles to
everything. If you have a CRUD or a simple code and put a lot of services,
interfaces, use cases... And write tests just to confirm that PostgreSQL can
insert and retrieve data, you don't need SOLID for it, nor tests for those
scenarios.

The worst scenario is when you have complex code that needs to be tested, but
it's impossible to test without PostgreSQL, Redis, Kafka, an Email Provider, or
any other external service being up. It doesn't matter if the result of your
code needs to be saved in a real database or in a kidnap, if the email was sent
or saved in a local folder, if a message was dispatched by a message broker or a
bird. You need to validate YOUR business, not the tools' business. The SOLID
principles are necessary more than ever in those scenarios. You need interfaces
and interchangeable classes to simulate the production operation and be able to
test without a huge effort.

The best way to determine if you are following the SOLID principles is by
writing unit tests. If you are unable to do so because it would require
rewriting the code, it is likely that you need to gain a better understanding of
the principles.

So, essentially, the true objective of principles and patterns is to avoid
cluttering your business code with unnecessary code that doesn't belong there.
