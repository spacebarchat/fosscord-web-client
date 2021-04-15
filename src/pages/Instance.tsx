import { useHistory } from "react-router";
import { Modal } from "../framework/Modal";

export default function Instance(props: any) {
	const history = useHistory();

	return (
		<Modal open={true} onClose={() => history.replace(history.location.pathname.replaceAll("/instance", ""))}>
			<h1>not finished yet</h1>
		</Modal>
	);
}
