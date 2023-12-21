# Fullstack E-Commerce Admin + Dashboard & CMS

Características principais:

- É utilizado Shadcn UI para criação da interface do painel de administração!
- O painel de administração servirá como CMS, Admin e API!
- Pode-se controlar vários fornecedores/lojas através deste único CMS! (Por exemplo, você pode ter uma “loja de sapatos”, uma “loja de laptops” e uma “loja de ternos”, e o CMS gerará rotas de API para todos eles individualmente!)
- Pode-se criar, atualizar e excluir categorias!
- Pode-se criar, atualizar e excluir produtos!
- Pode-se fazer upload de várias imagens de produtos e alterá-las quando quiser!
- Pode-se criar, atualizar e excluir filtros como "Cor" e "Tamanho", e depois combiná-los no formulário de criação de "Produto".
- Pode-se criar, atualizar e excluir "Outdoors" que são esses grandes textos no topo da página. Pode-se anexá-los a uma única categoria ou usá-los de forma independente.
- Pode-se pesquisar todas as categorias, produtos, tamanhos, cores, outdoors com paginação incluída!
- Pode-se controlar quais produtos serão “destaques” para que apareçam na página inicial!
- Pode-se ver seus pedidos, vendas, etc.
- Pode-se ver gráficos de sua receita, etc.
- MySQL + Prisma + PlanetScale

### Tecnologias

- React
- Next v.14
- MySQL
- PlanetScale
- Typescript
- Prisma
- Clerk
- Axios
- Chadcn UI
- Tailwind
- React Hook Form
- Zod
- Zustand
- Recharts

### Pré-requisitos

**Versão do node 18.17.0**

### Instalação dos pacotes

```shell
npm i
```

ou

```shell
yarn install
```

### Setup .env

Crie um arquivo .env na pasta raiz da sua cópia do projeto e cole essas configurações

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c2hhcmluZy1mb3hob3VuZC03Ni5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_sthW0Asgfv8XbSKhihm1B8RosCkio5VimklN4rM2VN
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dh51hj9te"
FRONTEND_STORE_URL=http://localhost:3001

```

### Conexão com o PlanetScale e Prisma

Rode esses comando no seu terminal para fazer a conexão do projeto com o banco de dados

```shell
npx prisma generate
npx prisma db push
```

### Inicie a aplicação

```shell
npm run dev
```

ou

```shell
yarn dev
```
