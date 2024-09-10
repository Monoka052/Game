using UnityEngine;

public class DoorController : MonoBehaviour
{
    public float openAngle = 90f;        // Angle to which the door will open
    public float openSpeed = 2f;         // Speed of opening/closing the door
    public KeyCode openKey = KeyCode.E;  // Key to open/close the door

    private Quaternion closedRotation;   // Initial rotation of the door (closed state)
    private Quaternion openRotation;     // Rotation of the door when open
    private bool isOpen = false;         // State of the door (open or closed)
    private bool isMoving = false;       // Indicates if the door is currently moving


    void Start()
    {
        // Save the initial (closed) rotation of the door
        closedRotation = transform.rotation;
        // Calculate the open rotation based on the closed rotation
        openRotation = Quaternion.Euler(closedRotation.eulerAngles + new Vector3(0, openAngle, 0));
    }

    void Update()
    {
        // Check if the specified key is pressed
        if (Input.GetKeyDown(openKey))
        {
            // Toggle the door state
            isOpen = !isOpen;
            isMoving = true;
        }

        // Smoothly rotate the door to the target rotation
        if (isMoving)
        {
            if (isOpen)
            {
                transform.rotation = Quaternion.Lerp(transform.rotation, openRotation, Time.deltaTime * openSpeed);
                if (Quaternion.Angle(transform.rotation, openRotation) < 0.1f)
                {
                    transform.rotation = openRotation;
                    isMoving = false;
                }
            }
            else
            {
                transform.rotation = Quaternion.Lerp(transform.rotation, closedRotation, Time.deltaTime * openSpeed);
                if (Quaternion.Angle(transform.rotation, closedRotation) < 0.1f)
                {
                    transform.rotation = closedRotation;
                    isMoving = false;
                }
            }
        }
    }
}
