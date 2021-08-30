import { ArticleCard } from "./ArticleCard"
import { PollCard } from "./PollCard"

export const Post = ({ post }) => {
  return post.type === 'post' ? <ArticleCard {...post} /> : <PollCard {...post} />;
}
