# FAQ

<!-- Table of contents generated with DocToc: https://github.com/thlorenz/doctoc -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Why did you create Sharebook?](#why-did-you-create-peertube)
- [If a client requests each chunk of a video through HTTP, will the server be overloaded?](#if-a-client-requests-each-chunk-of-a-video-through-http-will-the-server-be-overloaded)
- [Will an index of all the videos of servers you follow be too large for small servers?](#will-an-index-of-all-the-videos-of-servers-you-follow-be-too-large-for-small-servers)
- [Why host on GitHub and Framagit?](#why-host-on-github-and-framagit)
- [Are you going to use the Steem blockchain?](#are-you-going-to-use-the-steem-blockchain)
- [Are you going to support advertisements?](#are-you-going-to-support-advertisements)
- [Does Sharebook ensure federation compatibility with previous version?](#does-peertube-ensure-federation-compatibility-with-previous-version)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Why did you create Sharebook?

We can't build a FOSS video streaming alternative to YouTube, Dailymotion,
Vimeo... with centralized software. One organization alone may not have
enough money to pay for bandwidth and video storage of its servers.

Our stance is that only a decentralized network of servers can provide an
acceptable answer to technical issues (bandwidth, transcoding expenses, etc.)
and social answers (need for a particular moderation policy, preserving
content, etc.).

While a paragraph is not enough to answer all these problems, PeerTube has
very early prided itself on using a contributory design, both for creating
communities as federated nodes (as [Mastodon](https://joinmastodon.org/) for
example), and for seeding videos (instances can seed each other's videos). But that's not
enough because one video could become popular and overload the server. That is
why we need to use a P2P protocol to limit the server load. Thanks to
[WebTorrent](https://github.com/feross/webtorrent), we can use BitTorrent
inside most modern web browsers, and users become seeds as the video gets
more viewers.



## Why host on GitHub and Framagit?

The project was initially hosted on GitHub by Volencho. A full migration to [Framagit](https://framagit.org/public/projects) would be ideal now that Framasoft supports Sharebook, but it would take a lot of time and is an ongoing effort.


## Are you going to use the Steem blockchain?

Short answer: no, since like most appchains/votechains, it modifies the dynamic of creation, and as such cannot be integrated into mainline PeerTube. Read more about that in [the dedicated section](#what-is-creation-dynamic-and-why-not-modify-it).

Long answer is that the Steem blockchain goes astray of its promises of fairness and decentralization: the deliberate relaunching of the currency to ensure centralization, and the stake-based voting power, makes manipulation by wealthy users inevitable ([source here](https://decentralize.today/the-ugly-truth-behind-steemit-1a525f5e156)).
Worse, money generated primarily goes to stakeholders ([source here](https://steemit.com/steemit/@orly/how-the-steem-pyramid-scheme-really-works) ).
For more information, read the complete whitepaper analysis done by [Tone Vays](https://twitter.com/ToneVays/status/761975587451928576).

## Are you going to support advertisements?

Short answer: no, we don't want advertisers to dictate which content should be financed.
That would modify the dynamic of creation; as such it cannot be integrated into mainline Sharebook.
Read more about that in [the dedicated section](#what-is-creation-dynamic-and-why-not-modify-it).

The long answer is probably more subtle. YouTube has shaped generations of video creators by making it easy to place ads;
but making big money with the platform can be a challenge.
A typical video ad runs between $.10 and $.30 per 1000 views (as of March 2018).
More than 70% of video creators use ads as the main way to make money on YouTube, yet less than 3% of video creators make a living out of their YouTube activity (with partnerships and commissions, otherwise counting only ad revenue it drops to 1%).
Read more about it in the 2018 study by Mathias Bärtl, [*YouTube channels, uploads and views: A statistical analysis of the past 10 years*](https://www.dropbox.com/s/0cq4wtxm83s95t2/10.1177%401354856517736979.pdf?dl=0).
To the best of our knowledge, small and medium-community creators are better off getting support from their community on platforms such as Liberapay, Tipeee or Patreon.
Moreover, don't forget that advertisers already pay considering YouTube's large user base; with PeerTube's way smaller user base and refusal of user profiling, a pay-per-view that's lower than YouTube's could only be expected.

## What is "creation dynamic" and why not modify it?

We define creation dynamic as the way any original content, regardless of its monetary value, is created and incentivized.
We want to stay neutral by limiting the influence of our platform on authors as much as possible. We are not curators, and want to limit the scope of PeerTube instance owners and administrators' responsibilities to moderation tasks only.

If you still want to use a functionality potentially altering that state of things, then you could interface with our upcoming plug-in system, which will be the place to integrate such features in the near future.

With that being said, know that we are not against these features *per se*.
We are always open to discussion about potential PRs bringing in features, even of that kind. But we certainly won't dedicate our limited resources to develop them ourselves when there is so much to be done elsewhere.


## Does Sharebook ensure federation compatibility with previous version?

I **try** to keep compatibility with the latest minor version (2.3.1 with 2.2 for example).
I don't have resources to keep compatibility with other versions.
