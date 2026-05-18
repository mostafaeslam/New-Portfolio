"""
Counting Behavior Bridge (Django Version)
==========================================
Converts counting system output (entry/exit events) to behavior records.
Designed for Django app_resources workspace.

Usage:
    from counting_behavior_bridge import CountingBehaviorBridge

    bridge = CountingBehaviorBridge()
    result = bridge.process_count_event(frame, camera_id, entry_count, exit_count, inside_count)
"""

from utils import add_behavoir
from typing import Optional
import logging

# Simple logger for Django environment
logger = logging.getLogger(__name__)


class CountingBehaviorBridge:
    """
    Bridge between counting system and behavior recording.
    Converts counting events to behavior records that can be displayed on dashboard.
    """

    def __init__(self):
        self.last_entry_count = 0
        self.last_exit_count = 0
        self.last_inside_count = 0

    def process_count_event(
        self,
        frame,
        camera_id: int,
        entry_count: int,
        exit_count: int,
        inside_count: int,
        event_type: Optional[str] = None,
    ) -> Optional[dict]:
        """
        Process counting event and record as behavior if count changed.

        Args:
            frame: Current video frame (CV2 image)
            camera_id: ID of the camera
            entry_count: Total entries detected
            exit_count: Total exits detected
            inside_count: Current people inside
            event_type: Optional specific event type (e.g., "density_alert", "threshold")

        Returns:
            dict with recorded behavior info or None if no change
        """
        try:
            result = None

            # Detect entry event (entry count increased)
            if entry_count > self.last_entry_count:
                new_entries = entry_count - self.last_entry_count
                behavior_type = event_type or f"entry_{new_entries}"

                behavoir_obj = add_behavoir(
                    type_behavoir=behavior_type, frame=frame, camera_id=camera_id
                )

                result = {
                    "type": "entry",
                    "count": new_entries,
                    "total_entry": entry_count,
                    "behavior_id": behavoir_obj.id if behavoir_obj else None,
                    "camera_id": camera_id,
                }

                logger.info(
                    f"Behavior recorded: {new_entries} person(s) entered | Camera {camera_id}"
                )

            # Detect exit event (exit count increased)
            elif exit_count > self.last_exit_count:
                new_exits = exit_count - self.last_exit_count
                behavior_type = event_type or f"exit_{new_exits}"

                behavoir_obj = add_behavoir(
                    type_behavoir=behavior_type, frame=frame, camera_id=camera_id
                )

                result = {
                    "type": "exit",
                    "count": new_exits,
                    "total_exit": exit_count,
                    "behavior_id": behavoir_obj.id if behavoir_obj else None,
                    "camera_id": camera_id,
                }

                logger.info(
                    f"Behavior recorded: {new_exits} person(s) exited | Camera {camera_id}"
                )

            # Detect significant inside count change
            elif inside_count != self.last_inside_count:
                delta = inside_count - self.last_inside_count
                behavior_type = event_type or f"inside_change_{abs(delta)}"

                # Only record if significant change (more than 5% or more than 2 people)
                if abs(delta) > 2 or abs(delta) >= max(
                    2, self.last_inside_count * 0.05
                ):
                    behavoir_obj = add_behavoir(
                        type_behavoir=behavior_type, frame=frame, camera_id=camera_id
                    )

                    result = {
                        "type": "inside_change",
                        "delta": delta,
                        "total_inside": inside_count,
                        "behavior_id": behavoir_obj.id if behavoir_obj else None,
                        "camera_id": camera_id,
                    }

                    logger.info(
                        f"Behavior recorded: Inside count changed by {delta:+d} | Camera {camera_id}"
                    )

            # Update counters
            self.last_entry_count = entry_count
            self.last_exit_count = exit_count
            self.last_inside_count = inside_count

            return result

        except Exception as e:
            logger.error(f"Error processing count event: {e}", exc_info=True)
            return None

    def process_zone_count_event(
        self,
        frame,
        camera_id: int,
        zone_name: str,
        zone_count: int,
        event_type: Optional[str] = None,
    ) -> Optional[dict]:
        """
        Record zone-specific counting events as behaviors.

        Args:
            frame: Current video frame
            camera_id: ID of the camera
            zone_name: Name of the zone/area
            zone_count: Number of people in zone
            event_type: Optional specific event type

        Returns:
            dict with recorded behavior info
        """
        try:
            behavior_type = event_type or f"zone_{zone_name}_{zone_count}"

            behavoir_obj = add_behavoir(
                type_behavoir=behavior_type, frame=frame, camera_id=camera_id
            )

            result = {
                "type": "zone_count",
                "zone": zone_name,
                "count": zone_count,
                "behavior_id": behavoir_obj.id if behavoir_obj else None,
                "camera_id": camera_id,
            }

            logger.info(
                f"Behavior recorded: Zone '{zone_name}' has {zone_count} people | Camera {camera_id}"
            )

            return result

        except Exception as e:
            logger.error(f"Error processing zone count event: {e}", exc_info=True)
            return None

    def process_custom_event(
        self, frame, camera_id: int, event_name: str, event_data: Optional[dict] = None
    ) -> Optional[dict]:
        """
        Record custom counting-related events as behaviors.

        Args:
            frame: Current video frame
            camera_id: ID of the camera
            event_name: Name of the custom event
            event_data: Optional dict with event details

        Returns:
            dict with recorded behavior info
        """
        try:
            behavior_type = event_name

            behavoir_obj = add_behavoir(
                type_behavoir=behavior_type, frame=frame, camera_id=camera_id
            )

            result = {
                "type": "custom",
                "event_name": event_name,
                "event_data": event_data,
                "behavior_id": behavoir_obj.id if behavoir_obj else None,
                "camera_id": camera_id,
            }

            logger.info(
                f"Behavior recorded: Custom event '{event_name}' | Camera {camera_id}"
            )

            return result

        except Exception as e:
            logger.error(f"Error processing custom event: {e}", exc_info=True)
            return None

    def reset(self):
        """Reset counters (useful when camera resets or day changes)."""
        self.last_entry_count = 0
        self.last_exit_count = 0
        self.last_inside_count = 0
        logger.info("CountingBehaviorBridge counters reset")


# Example usage in frame processor
def example_usage():
    """
    Example of how to use this bridge in your Django view or signal.

    In views.py or wherever you process counting results:
    """
    bridge = CountingBehaviorBridge()

    def on_count_event(
        request, frame, camera_id, entry_count, exit_count, inside_count
    ):
        """Called after frame is processed and counts are updated."""

        # Record entry/exit/inside changes
        behavior = bridge.process_count_event(
            frame=frame,
            camera_id=camera_id,
            entry_count=entry_count,
            exit_count=exit_count,
            inside_count=inside_count,
        )

        if behavior:
            print(f"Behavior recorded: {behavior}")
            # Optionally send to WebSocket/dashboard here
            return behavior

        return None
