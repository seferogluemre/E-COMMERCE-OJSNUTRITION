import { Offcanvas } from "react-bootstrap";

interface MobileSidebarProps {
  show: boolean;
  handleClose: () => void;
}

function MobileSidebar({ show, handleClose }: MobileSidebarProps) {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileSidebar;
