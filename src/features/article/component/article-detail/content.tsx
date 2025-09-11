import MDEditor from "@uiw/react-md-editor";

export default function ArticleDetailContent({ content }: { content: string }) {
    return (
        <MDEditor.Markdown 
        wrapperElement={{
            'data-color-mode': 'light'
        }}
        source={content} />
    )
}