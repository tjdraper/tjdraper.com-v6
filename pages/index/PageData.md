---
heading: TJ Draper
subHeading: Senior Software Engineer. Reformed Presbyterian (baptize yo babies). Crazy CREC nutcase (feed yo babies). Deacon. Conservative libertarian.
subHeading2: On this site you'll find an eclectic collection of writings on software, technology, theology, musings, and information about me and my family.
---

## Site Background

This site originated as a Blogspot blog[^blogspotaddress] back in 2005 just a couple months before Rachel and I were married. I wanted a place to post pictures, write thoughts about things, and generally anything I find interesting. I also started wanting to get more familiar with building for the web. In the end, I hacked that that blog to death.

At some point I got my own domain, built a website, and the blogspot existed as a subset of the main domain (tjdraper.com/blog). I don't remember what I was doing with the main site. I do remember the design was horrible, and so was my design taste. I was still publishing the blog through [Blogger](https://www.blogger.com). Then I decided that the main focus of the site should be the blog. I also wanted a better publishing system; you know, a full CMS. I went with [ExpressionEngine](https://expressionengine.com/) Core (discontinued) because of it's ease of use and flexibility for designers (ExpressionEngine went on to be a huge part of my life). I copied and pasted about 2 years of blog posts by hand from Blogger to ExpressionEngine.[^blogspotcopypaste]

With the upgrade to ExpressionEngine 2, EllisLab killed the free for non-commercial use ExpressionEngine Core. I like free software if it's good, but I also understand the need for good software to be paid for. So I bit the bullet and purchased ExpressionEngine 2.

This site remained an ExpressionEngine 2 site long after EE 3, 4, 5, 6, and now 7 came out. It was time to do something.

Over the years, as I've started writing more and more custom software, and using more and different/interesting tools, I've used EE less and less (though I still love it and write add-ons for it). And I just haven't been publishing to this site (since 2015, until this new iteration in November of 2022) because it just felt like a pain and a slog to log into such an old control panel.

So in this iteration of the site, I've gone to a statically generated site, not a database CMS.

[^blogspotaddress]: [tjdraper.blogspot.com](https://tjdraper.blogspot.com) was the address of the old Blogspot blog, but that now redirects back to this site
[^blogspotcopypaste]: Yeah, I was a little bit insane to do that back then and I probably wouldn't do it again if I were in the same position again today.

## Design

This is the 6th major re-design of my site. It is a culmination of the years I have spent learning about web design and learning about my own tastes. I don't like busy sites, I don't like flashy ads all over the place, and most of all, I don't like websites that take a year and a day to load. In addition, having a responsive website is very important in this day and age of a multitude of difference screen sizes and devices.

## Technology

I'm a software engineer, so naturally, I feel compelled to include a section about the technology stack that powers this site.

[This iteration of the site](https://github.com/tjdraper/tjdraper.com-v6) is [statically generated](https://nextjs.org/docs/basic-features/pages#static-generation) at deploy time using [Next.js](https://nextjs.org/), a lot of [JSX](https://reactjs.org/docs/introducing-jsx.html), [TypeScript](https://www.typescriptlang.org/), [GitHub Flavored](https://github.github.com/gfm/) [Markdown](https://daringfireball.net/projects/markdown/) via [MDX](https://mdxjs.com/), and some custom code to generate a few page routes that Next can't quite handle statically, [Tailwind CSS](https://tailwindcss.com/) with components used and modified from [Tailwind UI](https://tailwindui.com/), and it deploys on [Vercel](https://vercel.com/)'s serverless infrastructure.

## Why No Comments?

I used to have comments on this site, but not anymore. Why? First, the simple fact is, hardly anyone ever commented here. I'm just not that important.

Secondly, since I've moved to a statically generated site, comments would be harder. I could use a service like Disqus, but then I'd have to embed their nasty JavaScript. So, no thanks.

Thirdly, and perhaps most importantly, commenters are trolls (for the most part). I've come a long way in my thinking on this. I used to think comments were essential to a blog or online publication. And I loved to think people were engaged enough to comment on my posts. It was sort of self serving. I've come to realize that traditional commenting systems represent everything that is wrong with the Internet. In fact, I don't even bother to read comments on any of the sites I visit anymore that actually still use comments. The comments are full of ignorant trolls who want nothing more than to slander the author, or bash the other commenters. I'm not saying that's true of anyone who might be inclined to comment on my posts here, but a while back, I did have to do some comment moderation and I'd rather just not deal with that.

## About Me and My Family

We are Reformed Presbyterian in view and practice and we are currently members of [St. Mark Reformed Church](https://www.stmarkreformed.com/) where I [serve as a deacon](https://www.stmarkreformed.com/about/leadership). We've been at SMRC since 2015. Prior to that, we were members of [Heritage Church](https://heritagecenterville.org/) when we lived out that way.

### Covenant Children

We believe that the New Covenant is for believers _and_ their families. And just as in the Old Covenant where the children were given the sign and seal of the covenant in circumcision, so too do New Covenant children receive the sign and seal of our Christian faith; that of baptism.

We believe that Christian Parents are to raise their covenant children in the nurture and admonition of the Lord. Christian children do not “belong” to the parent, nor do they belong to the evil one. They belong to Christ. They are not enemies of the gospel, they are Christ's disciples. Christian parents are to realize that the Children the Lord entrusts to them are not their own but Christ's. We are to take heed to follow the instructions of the Bible when it comes to raising our children. We are to be faithful to teach them correct and sound doctrine, in short we are responsible for every aspect of the child's training. We do not have the authority to abdicate and hand that off to someone else. Not to the Church, not to government schools, but we bear the weight and responsibility entirely.[^childrenresponsibility]

[^childrenresponsibility]: The disclaimer must always be added here that I use the term responsibility, not in a way that rules out anyone else teaching our Children anything at all. For instance, neither I nor Rachel are competent violin teachers and neither of us can play that instrument at all. We would therefore employ an instructor should our children need training in violin. That does not mean we abdicate our responsibility in this matter.

### Confessions and Affiliations

We subscribe to:

- [The Apostles' Creed](http://en.wikipedia.org/wiki/Apostles'_Creed)
- [The Nicene Creed](http://en.wikipedia.org/wiki/Nicene_Creed)
- The [Westminster Standards](http://en.wikipedia.org/wiki/Westminster_Standards) and [Confession of Faith](http://en.wikipedia.org/wiki/Westminster_Confession_of_Faith)

### The Doctrines of Grace (often referred to as Calvinism)

We affirm the five points of [Calvinism](http://en.wikipedia.org/wiki/Calvinism) as properly and Biblically understood (In other words we deny Hyper Calvinism).

- Total Depravity (or completely inability to save one's self, or even to make a decision to call upon Christ)
- Unconditional Election (God has written History, and has already chosen his elect)
- Limited Atonement (that Christ's sacrifice on the cross accomplished all that it was intended to. Sometimes referred to as the efficacy of the atonement)
- Irresistible Grace (God saves those whom he purposes to)
- Perseverance of the Saints (those who are elect will persevere in the faith to the end)

### Other points of doctrine we affirm

- Post Millennialism (Christ is ruling and reigning right now. Christ is King!)
- Covenant Renewal Worship
- Liturgical Worship
- Partial Preterism

And we desire to see a modern day reformation which would include among other things (in no particular order):

- A recovery of the singing of Psalms
- A Proper understanding of the place of Lord's Day Worship
- An acknowledgment of the place of the Church within what is commonly referred to as the three spheres of authority
- A proper understanding of the Covenant as it relates to Believers in the New Covenant
- An understanding of roles within the home, specifically of the role of the Father. This would also include a turning of the father's heart to His Children
- Generational Faithfulness
- A return to the Covenant Community of believers
- A proper understanding of the Lordship of Jesus Christ (this is closely tied to Post Millennialism)
