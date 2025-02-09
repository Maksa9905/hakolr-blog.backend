import { postLabelModel } from '#models/post_labels'

class PostLabelsService {
  static get_random_post_label = async () => {
    const postLabels = await postLabelModel.find()
    console.log(postLabels)
    const randomIndex = Math.floor(Math.random() * postLabels.length)
    return postLabels[randomIndex] || null
  }
}

export default PostLabelsService
