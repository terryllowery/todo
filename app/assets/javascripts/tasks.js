
$(function() {



	// The taskHtml method takes in a JavaScript resepsentation
	// of the task and produces an HTML respresentatioin using
	// <li> tags
	function taskHtml(task) {
		var checkedStatus = task.done ? "checked" : "";
		var liElement = '<li><div class="view"><input class="toggle" type="checkbox"' +
			" data-id='" + task.id + "'" +
			checkedStatus +
			'><label>' +
			task.title +
			'</label></div></li>';
		return liElement;
	}

	// toggleTask takes in an html representation of
	// an event that fires from an html representation of
	// the toggle checkbox and performs an api request to toggle
	// the value of the 'done' field

	function toggleTask(e) {
		var itemId = $(e.target).data("id");
		var doneValue = Boolean($(e.target).is(':checked'));

		$.post("/tasks/" + itemId, {
			_method: "PUT",
			task: {
				done: doneValue
			}
		});
	}

	$.get("/tasks").success( function( data ) {
		var htmlString = "";
		$.each(data, function (index, task) {
			htmlString += taskHtml(task);
		});

		var ulTodos = $('.todo-list');
		ulTodos.html(htmlString);

		$('.toggle').change(toggleTask);
	});
	$('#new-form').submit(function (event) {
		event.preventDefault();
		console.log("Intercepted");
		var textBox = $('.new-todo');
		var payload = {
			task: {
				title: textBox.val()
			}
		};
		$.post("/tasks", payload).success(function (data) {
			var htmlString = taskHtml(data);
			var ulTodos = $('.todo-list');
			ulTodos.append(htmlString);
			$('.toggle').click(toggleTask);
		})
	});
});
