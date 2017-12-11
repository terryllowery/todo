require 'rails_helper'

RSpec.describe TasksController, type: :controller do
	describe "tasks#index" do
		it "should list the tasks in the database" do
			task1 = FactoryBot.create(:task)
			task2 = FactoryBot.create(:task)
			get :index
			expect(response).to have_http_status(:success)
			response_value = ActiveSupport::JSON.decode(@response.body)
			expect(response_value.count).to eq(2)
		end
	end

	describe "tasks#update" do
		it "should update a task in database to done" do

			task = FactoryBot.create(:task)
			put :update, params: {id: task.id, task: { done: true }}
			expect(response).to have_http_status(:success)
			task.reload
			expect(task.done).to eq(true)

		end
	end

end
