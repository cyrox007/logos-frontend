<template>
    <section class="article-page">
        <div class="container article-page__wrapper">
            <div class="article-page__data">
                <header class="article-page__header">
                    <div class="article-page__header_image">
                        <img :src="article.image" :alt="article.name">
                    </div>
                    <div class="article-page__header_meta">
                        <h1 class="article-page__header--title">{{ article.name }}</h1>
                        <span>{{ article.categoryname }} - База знаний</span>
                        <span>{{ article.date }}</span>
                        <span>{{ article.author }}</span>
                    </div>
                </header>
                <div class="article-page__body">
                    <div class="article-page__body_preview"> 
                        <p><b>Аннотация: </b>{{ article.preview }}</p>
                    </div>  
                    <div class="article-page__body_keyword">
                        <p><b>Ключенвые слова: </b>{{ article.keyword }}</p>
                    </div>
                    <div class="article-page__body_content">
                        <p>{{ article.content }}</p>
                    </div>
                    <div class="article-page__body_bibliography">
                        <h2>Список источников и литературы</h2>
                        <ol>
                            <li v-for="bible in article.bibliography" :key="bible">{{ bible }}</li>
                        </ol>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
</template>

<script>
    /* import ArticleElement from '@/components/Articles/ArticleElement.vue'; */
    /* import CategoriesService from '@/API/CategoriesService.js'; */
    export default {
        name: "ArticlePage",
        components: {
        },
        methods: {
            /* async getData() {
                try {
                    this.isLoading = true;
                    const response = await CategoriesService.getCategories();
                    console.log(response);
                } catch (error) {
                    console.error(error);
                } finally {
                    this.isLoading = false;
                }
            } */
        },
        beforeMount() {
            document.title = `${this.article.name} | База знаний | Logos`;
            document.querySelector('meta[name="description"]').content = this.article.preview
            /* this.getData(); */
            console.log(this.$route.params.catName);
        },
        data () {
            return {
                isLoading: false,
                article: {
                    name: "Название статьи",
                    categoryname: "Философия",
                    date: "2024-04-24 10:28",
                    author: "admin",
                    image: "https://img.icons8.com/ios/100/book--v1.png",
                    preview: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem quae sint, rem mollitia nulla hic quasi autem quod nostrum qui exercitationem sit earum quis nobis officia illum? Aspernatur consectetur architecto aliquam necessitatibus aperiam maiores dicta et eaque, natus, veniam ad reprehenderit sequi doloribus ullam deserunt nam recusandae adipisci, nostrum neque? Molestiae tenetur corporis sapiente laudantium perferendis suscipit aliquam perspiciatis, iusto quas praesentium repellendus tempore adipisci officiis mollitia illo obcaecati rerum totam! Tempora, nihil inventore facere harum accusantium obcaecati aliquid molestiae consequuntur maxime, magnam vero eveniet est enim nisi debitis asperiores corporis, ut ipsum labore accusamus sed perferendis distinctio eum! Inventore, obcaecati? Adipisci inventore, ut eaque totam voluptate eum maxime sequi fuga odit quod? Sapiente nemo consequatur ullam, veniam, natus excepturi rerum cumque earum in culpa expedita modi ipsam fugit illum a iste exercitationem, vitae architecto accusantium adipisci cupiditate officia illo. Earum fuga suscipit ipsum corporis sint est magni magnam odit!",
                    keyword: "Key, Word, Hello, Cat, Dog",
                    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam doloremque voluptatibus, delectus aliquam magnam totam dolore nobis animi nesciunt recusandae, soluta neque itaque temporibus voluptates. Odio, commodi. Labore quidem tenetur error tempora eveniet cupiditate. Illo eligendi maiores pariatur saepe consequatur atque nisi ab ut vel iusto quaerat, suscipit sunt quasi, eos nostrum? Officiis modi natus voluptatibus officia et quasi ducimus iure ut quia dignissimos. Fugit nam quam asperiores exercitationem harum id, dolores molestias debitis ut, officia adipisci nisi dolore laborum enim quia temporibus saepe, corporis laudantium ratione sit velit reiciendis? Asperiores ad in nulla rerum doloribus voluptates molestias veniam enim quidem quasi cumque rem officia eligendi accusamus eveniet maiores aspernatur, laudantium sunt temporibus unde nobis. Eveniet ex neque incidunt nesciunt consequuntur nisi? Cupiditate nulla amet qui culpa perspiciatis, eligendi, veniam blanditiis velit nobis hic sit voluptatibus debitis repellat corporis, cum iste illum necessitatibus impedit dolorum tenetur natus reprehenderit nemo minus eius! Deleniti totam, recusandae officiis enim delectus nobis fuga, eos commodi nam sit saepe assumenda esse dicta ducimus harum numquam magni quos repellat temporibus. Maiores dicta soluta incidunt, veritatis ducimus tenetur suscipit accusamus vitae, blanditiis rem, libero voluptate. Sit pariatur fugit reprehenderit veritatis. Quas, cum? Porro ratione deleniti accusantium tempore aut. Autem, laboriosam! Recusandae rem odio voluptates tenetur provident omnis et vero dicta accusantium reiciendis quis distinctio temporibus numquam, consectetur aliquid maiores minima? Quam quae, aperiam saepe, explicabo qui itaque atque recusandae aut mollitia a dolor. Cupiditate nobis, eius tenetur explicabo quo at, similique autem, dolore quaerat quibusdam ea ducimus exercitationem. Reprehenderit placeat quibusdam nihil amet ut enim architecto ipsum ex maxime assumenda! Sapiente id eum vitae ad fuga, commodi quod dignissimos mollitia animi ea saepe est obcaecati corporis explicabo accusantium voluptatibus eaque qui quas repudiandae nesciunt laboriosam. Repudiandae ipsum explicabo aperiam assumenda totam blanditiis excepturi fuga error eum ullam?",
                    bibliography: ['Элемент библиографии','Элемент библиографии','Элемент библиографии']
                }
            }
        }
    }
</script>

<style>

.article-page {
    /* background-color: var(--color-white); */
    margin-top: 40px;
}
.article-page__data {

    border: 1px solid var(--color-blue);
    background-color: var(--color-white);
    box-shadow: 0 4px 15px -12px var(--color-black);
}
.article-page__header {
    padding: 20px;
    display: flex;
    flex-direction: row;
}
.article-page__header_meta {
    display: flex;
    flex-direction: column;
    text-align: left;
}
.article-page__header_image {
    max-width: 250px;
    width: 100%;
    max-height: 250px;
    height: 100%;
    img {
        width: 100%;
        height: auto;
    }
}

.article-page__body {
    padding: 20px;

    text-align: justify;
    font-size: 18px;
}
.article-page__body_preview {
    font-size: 14px;
    margin-bottom: 20px;
}
.article-page__body_keyword {
    font-size: 14px;
    margin-bottom: 20px;
}
.article-page__body_content {
    margin-bottom: 20px;
    p {
        text-indent: 25px;
    }
}
.article-page__body_bibliography {
    h2 {
        text-align: center;
    }
    ol {
        li {
            margin-left: 20px;
        }
    }
}
</style>