# Vercel AI SDK RAG

#### This project Based off Starter Project with modifications based on the Vercel docs

This is the starter project for the Vercel AI SDK [Retrieval-Augmented Generation (RAG) guide](https://sdk.vercel.ai/docs/guides/rag-chatbot).

This project is a vercel ai sdk chatbot that will only respond with information that it has within its knowledge base. This is done by using tools. Tools also allow you to also stream UI from the backend (not in the scope of this example, but is a todo). The chatbot will be able to both store and retrieve information. This project is a foundation for an AI version of myself or a customer service rep for a business!

This project will use the following stack:

- [Next.js](https://nextjs.org) 14 (App Router)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI](https://openai.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Postgres](https://www.postgresql.org/) with [ pgvector ](https://github.com/pgvector/pgvector)
- [shadcn-ui](https://ui.shadcn.com) and [TailwindCSS](https://tailwindcss.com) for styling


### Requirements for use
> This project requires an **openapi** key. 

> This project is set up to run postgresql locally. but you can change that to use vercel or another postgresql service.

### Prep

#### setting up postgresql locally

```terminal
brew services start postgresql 
```

#### checking postgres services
```
ps aux | grep postgres
```

#### running postgres database for this project locally
```
psql -d postgres -U home

```

once you have set up postgresql locally and run pnpm install (all required libs) you can migrate the db. this will set up the schema and tables
```python
pnpm db:migrate
```

after you have the hook to search query embeddings 
```python
pnpm db:push
```
```terminal
pnpm add ai @ai-sdk/openai
```