function SubmitButton(props) {
    return (
        <button onClick={props.onClick} className={"transition duration-150 focus:outline-none " + props.className} type="submit">
            <span className="relative text-xl text-gray-50">
                <span className="hidden lg:inline">
                    {props.text || "Submit"}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="inline w-8 pb-1 pl-1 fill-current text-gray-50 icon-click-target">
                    <path className="primary" fill="hsl(220, 13%, 95%)" d="M21.97 12.73c-.25-.22-.56-.4-.92-.54L20 11.8a8 8 0 1 0-8.2 8.2l.4 1.06c.12.36.3.67.53.92a10 10 0 1 1 9.25-9.25zm-10.95 5.19a6 6 0 1 1 6.9-6.9l-2.39-.9a4 4 0 1 0-5.41 5.41l.9 2.39z" />
                    <path className="secondary" d="M17.96 16.54l3.75 3.75a1 1 0 0 1-1.42 1.42l-3.75-3.75-.57 2.28a1 1 0 0 1-1.9.11l-3-8a1 1 0 0 1 1.28-1.29l8 3a1 1 0 0 1-.1 1.91l-2.3.57z" />
                </svg>
            </span>
        </button>
    )
}

export default SubmitButton;