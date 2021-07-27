import { useState, FormEvent } from 'react';

import Comment from './Comment';
import Loader from './Loader';

import { useCreateCommentMutation, useEditCommentMutation } from '../../services/posts';

import { Comment as CommentModel } from '../../models/Post';

function CommentForm(props: Partial<CommentModel>) {
  const isCreateForm: boolean = props.id == null;

  const [createComment, {
    isLoading: isCreatingComment,
    isError: isCreateCommentError,
    isSuccess: isCreateCommentSuccess,
    data: createCommentResult,
    error: createCommentError,
  }] = useCreateCommentMutation();

  const [editComment, {
    isLoading: isUpdatingComment,
    isError: isUpdateCommentError,
    isSuccess: isUpdateCommentSuccess,
    data: updateCommentResult,
    error: updateCommentError,
  }] = useEditCommentMutation();

  const [name, setName] = useState(props.name || '');
  const [email, setEmail] = useState(props.email || '');
  const [body, setBody] = useState(props.body || '');

  const onSubmit = (event: FormEvent) => {
    const payload: Partial<CommentModel> & Pick<CommentModel, 'postId'> = { postId: props.postId!, name, email, body };

    event.preventDefault();

    isCreateForm
      ? createComment(payload)
      : editComment({ ...{ id: props.id }, ...payload });
  };

  return (
    <section className="p-6 bg-white rounded-md">
      {(isCreatingComment || isUpdatingComment) && <Loader label={isCreateForm ? "Commenting..." : "Updating..."} />}
      {(isCreateCommentError || isUpdateCommentError) && <span>{JSON.stringify(isCreateForm ? createCommentError : updateCommentError)}</span>}
      {(isCreateCommentSuccess || isUpdateCommentSuccess) && (
        <>
          <div className="flex justify-center">
            <span className="text-lg font-bold">Comment {isCreateForm ? "Created" : "Updated"}</span>
          </div>
          <Comment {...(isCreateForm ? createCommentResult : updateCommentResult)} />
        </>
      )}
      {
        (!isCreatingComment && !isCreateCommentError && !isCreateCommentSuccess) &&
          (!isUpdatingComment && !isUpdateCommentError && !isUpdateCommentSuccess)
          ? (
            <form onSubmit={onSubmit}>
              <div className="relative my-4">
                <label htmlFor="name" className="text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative my-4">
                <label htmlFor="name" className="text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <label className="my-4 text-gray-700" htmlFor="name">
                Body
                <textarea
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="body"
                  placeholder="Enter post body"
                  name="body"
                  rows={5}
                  cols={40}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
              </label>
              <button
                type="submit"
                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          ) : null}
    </section>
  );
}

export default CommentForm;
