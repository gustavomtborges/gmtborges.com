---
title: Developing production-ready software with the smallest effort and maximum outcome.
pubDatetime: 2023-10-02T11:27:00.000Z
featured: true
tags:
  - quality
  - design
  - test
---

[Strong Opinionated]

When we start a new project we are eager to see our code running, nowadays even previewed like production with platforms like vercel, cloudflare, netlify.
And the underrated _design_ was left behind. Many of us misunderstood, thinking it is flow charts, diagrams, or UML things.
Assuming that using a hyped architecture, or a folder structure is enough, and magically your design is done.
Together with another misconception that unit test is responsible for testing the requirements, then it isn't worth the work.
Now, your code is ready to be messy.

I like to explain a good design by making an analogy with a car factory.

In a car factory, there are units, each one responsible for producing a part of the car with the correct specifications:

- Car body
- Engine
- Transmission
- Electrics

If the transmission was made wrong, then it can't communicate with the engine. So, if one unit was made with the wrong specification the whole doesn't work.
That is the core of _design_, **making parts of a product communicate well, without friction**.

Returning to our programming world, a unit test is the practice to help us make a good design. Each part of our code is a unit, and it has your right specification.
We wrote the specification in the format of tests that proved our code does what it has to do and communicates well with the other parts. One golden tip for writing unit tests
is to think of what the code can't do in addition to writing the test of what it will do.

Here, is another similar definition by David Farley an authority on the subject, and author of two great books: Continuous Delivery and Modern Software Engineering.

### Unit Tests

Unit Tests give us very fast feedback on our code, they really answer the question "does my code do what I think it does".
So they amplify the quality of our design and reassure us that our code is correct.
Data from production systems says that 58% of prod' defects are the result of our code not doing what we think - the common mistakes that all programmers make,
whatever the tech. So Unit Tests like these can dramatically reduce defects.
Unit Tests are best produced as the output of TDD - This creates better tests,
but the real value of TDD at this level is that it applies a pressure on the design of our code. It makes us design our code from the perspective of a consumer of our code.
But Unit Tests don't answer all our question about our system. How do we know it works together, does it deploy, does it do what users want?
Adding Acceptance Tests allows us to test these things.

---

Coming back to our car factory, after all the parts were assembled, because of the well-done design of each one. Now, the car is ready to test its requirements.
Is impossible to test in an automated way all the cars manufactured, then some cars are part of the test cases. Because of the good design, they have assurance
that the other ones are OK too. This is another benefit of a good design, gives you confidence that your work does what will expected it to do.
The point is if you change your design without testing the new specification (change code without review the unit tests), you already know that your requirements test could fail.

So, it's time to test the requirements. As a user of your software, write the test cases,
and test everything you can in the most production-like environment possible, this environment is called _staging_.
Don't waste your time writing automated e2e tests, the effort is massive, and when your e2e is all green,
in production your cache system is offline. What are you gonna do?
So, for instance, do it manually. Any automated test will never have the fine-grained sight, and feeling of a human, and before start,
always write the test case descriptions. They are very important.
When you will have a dedicated team of QA analysts, now is the time to automate. Until then,
spend your time concerning the observability of your system and techniques to recover fast, like infrastructure as code.

The Dave Farley definition of testing requirements is a bit different, but the same logic. Guarantee that the software is ready for production.

### Acceptance Testing

Acceptance Tests test user visible features, in life-like scenarios, in a production-like test environment.
They simulate the real use of the software and so determine the releasability of any changes.
This allows us to test things like the system's deployment, deploying it in the same way as it will be deployed into production,
changes to configuration and infrastructure, and integration of all of the parts of our system, before we release it.
Acceptance Tests, at least in Continuous Delivery, also define the releasability of our system.
If all these tests pass, we are ready to release!
In addition to all of that, Acceptance Tests also can drive the development process, and act as clear,
accessible specifications for the system we are about to build. These are executable requirements, that drive the whole development process.

> I think that the combination of Unit Testing - based on TDD, and Acceptance Testing - driving the requirements process,
> represents a world-class approach to Test Strategy, and makes the construction of high quality software easier and more likely.

~Dave Farley

# Conclusion

Therefore, like in the car factory, without good design (remember, pieces communicating well and no friction)
and without the requirements tested by meticulous people, maybe we would be riding horses.
The same way, without unit and acceptance tests, we are doomed by lot of _go-horse_ softwares,
caused by the accidental complexity and by the bunch of tools we are dive in.

**Softwares with low complexity\* are the ones with a good design!**.

**Complexity**: How easily you can change/replace things.

I like this unit/acceptance approach because it's simple and focuses on less effort tasks.
Removes the fatigue of thinking in a lot of tools, techniques, architectures, and miracles, making your software production-ready faster.
And, for me, the best: Improve your experience in programming well-designed code, one of the most important things,
at the same time one of the most underrated and left behind by many.

# References

### David Farley videos

https://www.youtube.com/@ContinuousDelivery

### Extreme Programming Explained: Embrace Change

https://www.goodreads.com/book/show/67833.Extreme_Programming_Explained

### Kevlin Henney lectures

https://www.youtube.com/results?search_query=kevlin+henney
